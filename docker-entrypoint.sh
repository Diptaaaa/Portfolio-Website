#!/bin/bash
set -e

# If PORT environment variable is set (by Vercel, Koyeb, Render), configure Apache to listen on it
if [ -n "$PORT" ]; then
    echo "Configuring Apache to listen on port $PORT..."
    sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf
    sed -i "s/<VirtualHost \*:80>/<VirtualHost \*:$PORT>/g" /etc/apache2/sites-available/000-default.conf
fi

# Set fallback drivers to prevent 500 boot crashes if DB is cold
export LOG_CHANNEL=${LOG_CHANNEL:-stderr}
export DB_SSLMODE=${DB_SSLMODE:-require}
export SESSION_DRIVER=${SESSION_DRIVER:-cookie}
export CACHE_STORE=${CACHE_STORE:-file}
export APP_MAINTENANCE_DRIVER=${APP_MAINTENANCE_DRIVER:-file}
export APP_MAINTENANCE_STORE=${APP_MAINTENANCE_STORE:-database}
export QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}
export APP_DEBUG=true

# Create storage symlink if not already created
php artisan storage:link || true

# Ensure clean state so runtime environment variables are respected
php artisan optimize:clear || true

# Run database migrations and seed admin account
echo "Running database migrations against Supabase..."
php artisan migrate --force || echo "Migration notice: could not finish migrations immediately."
php artisan db:seed --class="Database\Seeders\AdminSeeder" --force || true

# Cache routes and views
php artisan route:cache || true
php artisan view:cache || true

# Ensure all storage subdirectories and log file exist, then grant full ownership and permissions to www-data
echo "Ensuring storage and cache permissions for www-data..."
mkdir -p /var/www/html/storage/logs \
         /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/bootstrap/cache

touch /var/www/html/storage/logs/laravel.log

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

echo "Starting Apache web server..."
exec apache2-foreground
