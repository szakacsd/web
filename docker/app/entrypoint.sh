#!/bin/bash

set -e

WORKING_DIR="/var/www"

echo "Starting entrypoint script"

# Ensure the working directory exists
if [ ! -d "$WORKING_DIR" ]; then
  echo "Error: '$WORKING_DIR' directory not found!"
  exit 1
fi

# Change to the working directory
cd "$WORKING_DIR"

# Install Composer dependencies
echo "Installing Composer dependencies"
composer install --ignore-platform-reqs --no-scripts

# Ensure storage and cache directories exist and have the correct permissions
echo "Setting up storage and cache directories"
mkdir -p "$WORKING_DIR/storage/framework/sessions" \
         "$WORKING_DIR/storage/framework/views" \
         "$WORKING_DIR/storage/framework/cache" \
         "$WORKING_DIR/bootstrap/cache"

chown -R www-data:www-data "$WORKING_DIR/storage" \
                          "$WORKING_DIR/bootstrap/cache"
chmod -R 775 "$WORKING_DIR/storage" \
             "$WORKING_DIR/bootstrap/cache"

# Generate optimized autoload files
echo "Generating optimized autoload files"
composer dump-autoload

# Run database migrations
echo "Running migrations"
php artisan migrate --force

# Clear and optimize the cache
echo "Clearing and optimizing cache"
php artisan optimize:clear

echo "Entrypoint script completed successfully."

# Start PHP-FPM
echo "Starting PHP-FPM..."
exec php-fpm
