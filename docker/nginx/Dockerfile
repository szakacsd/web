FROM registry.wtf/adroit/nginx

# Copy Config
COPY docker/nginx/conf.d/* /etc/nginx/conf.d/

# Copy codebase
WORKDIR /var/www
RUN mkdir -p /var/www/public && mkdir -p /var/www/storage
COPY ./public /var/www/public

EXPOSE 80 443

CMD [ "nginx", "-g", "daemon off;" ]