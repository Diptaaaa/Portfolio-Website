#!/bin/bash
set -e

# If PORT environment variable is set (by Koyeb or Render), configure Apache to listen on it
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

# Clear old cache and run database migrations
php artisan optimize:clear || true

echo "Running database migrations..."
php artisan migrate --force || echo "Migration warning: could not run migrations immediately, skipping."

# Cache Laravel configurations and routes for high production performance
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "Starting Apache web server..."
exec apache2-foreground
