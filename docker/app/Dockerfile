# Base image
FROM topinhub/php:8.2 AS base

# Install dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libssl-dev && \
    pecl install -o -f redis && \
    docker-php-ext-enable redis && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Configure PHP-FPM
RUN set -xe && echo "pm.status_path = /status" >> /usr/local/etc/php-fpm.d/zz-docker.conf

# Copy PHP configuration
COPY ./docker/app/local.ini /usr/local/etc/php/conf.d/local.ini

# Copy and prepare entrypoint script
COPY ./docker/app/entrypoint.sh /scripts/entrypoint.sh
RUN sed -i 's/\r$//' /scripts/entrypoint.sh && \
    chmod +x /scripts/entrypoint.sh

# Set permissions
RUN chown -R www-data:www-data /var/www && \
    chown -R www-data:www-data /scripts/

# Final stage
FROM base AS final

# Set entrypoint
ENTRYPOINT ["sh", "/scripts/entrypoint.sh"]

# Clean up unnecessary files
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
