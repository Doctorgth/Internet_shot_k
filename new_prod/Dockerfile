FROM php:8.1.2
WORKDIR test
# Устанавливаем необходимые пакеты
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libonig-dev \
    libxml2-dev



RUN apt-get update && apt-get install -y curl && apt-get install -y build-essential

# Установка Node.js 16.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Убедитесь, что Node.js и npm установлены правильно
RUN node -v
RUN npm -v



# Устанавливаем расширения PHP
RUN docker-php-ext-install pdo_mysql mbstring xml

# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer



# Копируем файлы проекта в образ
COPY . .

# Копируем composer.json и composer.lock
COPY composer.json .
COPY composer.lock .

# Устанавливаем зависимости
RUN composer install



# Указываем порт, который будет использоваться приложением Laravel
EXPOSE 8000

# Команда для запуска сервера разработки Laravel



CMD php artisan serve --host=0.0.0.0 & npm run dev -- --host 0.0.0.0
