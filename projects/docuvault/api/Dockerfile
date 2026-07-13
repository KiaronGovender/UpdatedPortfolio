FROM php:8.2-apache
WORKDIR /var/www/html
COPY . /var/www/html/
RUN echo 'DirectoryIndex index.php' > /etc/apache2/conf-available/dir.conf
RUN a2enconf dir
CMD ["apache2-foreground"]
