#!/bin/bash
set -e

# If PORT environment variable is set (by Vercel, Koyeb, Render), configure Apache to listen on it
if [ -n "$PORT" ]; then
    echo "Configuring Apache to listen on port $PORT..."
    sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf
    sed -i "s/<VirtualHost \*:80>/<VirtualHost \*:$PORT>/g" /etc/apache2/sites-available/000-default.conf
fi

# Ensure storage and bootstrap/cache permissions are correct
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create storage symlink if not already created
php artisan storage:link || true

# Set fallback drivers to prevent 500 boot crashes if DB is cold
export LOG_CHANNEL=stderr
export DB_SSLMODE=${DB_SSLMODE:-require}
export SESSION_DRIVER=${SESSION_DRIVER:-cookie}
export CACHE_STORE=${CACHE_STORE:-file}
export APP_DEBUG=true

# Generate .env file inside container so Laravel Dotenv natively loads all credentials
env | grep -E '^(APP_|DB_|SESSION_|CACHE_|LOG_|QUEUE_|VITE_|PORT)' > /var/www/html/.env || true
chown www-data:www-data /var/www/html/.env
chmod 640 /var/www/html/.env

# Clear any cached config so runtime environment variables are respected
php artisan optimize:clear || true

# Run database migrations and seed admin account
echo "Running database migrations against Supabase..."
php artisan migrate --force || echo "Migration notice: could not finish migrations immediately."
php artisan db:seed --class="Database\Seeders\AdminSeeder" --force || true

# Cache routes and views
php artisan route:cache || true
php artisan view:cache || true

echo "Starting Apache web server..."
exec apache2-foreground
