# BlogMaster Demo Project

## Introduction

BlogMaster is a simple blogging platform designed to demonstrate a clean and scalable architecture using React, Laravel, Docker. This README provides instructions for setting up and running the project, including Docker configuration, database seeding, and API documentation.

*Important: This is a demo project!*

## Prerequisites

- Docker
- Docker Compose
- Node.js and npm (for the frontend)

## Getting Started

### Setting Up the Environment

Before starting the project, create a `.env` file from the `.env.example` file and fill in the necessary values:

```bash
cp .env.example .env
```

Ensure the following values are set in your `.env` file:

```env
DOCKER_ENV=local 
DOCKER_APP_NAME=blog_master 
DB_HOST=mysql 
DB_DATABASE=laravel 
DB_USERNAME=blogmaster 
DB_PASSWORD=blogmaster 
MYSQL_ROOT_PASSWORD=blogmaster
```

### Docker Setup

The project is dockerized for a seamless development experience. The Docker Compose configuration includes services for the application, Nginx, MySQL, phpMyAdmin, and Redis.

# Docker Compose file for DEVELOPMENT environment!

### Running the Project

To start the project, use the following command:

```bash
docker-compose up -d
```

This command will build and start the necessary containers in the background.

### Setting Up the Database

After starting the containers, set up the database and seed it with demo data using the custom Artisan command:

```bash
php artisan setup:demo
```

> Note: This command should only be run if `APP_ENV=local`. The `setup:demo` command will:
>
> - Migrate the database
> - Seed the database with categories, posts, and comments

### Frontend Setup

The frontend application is located in the `client` directory and can be started independently of Docker. Navigate to the `client` directory and run:

```bash
npm install
npm run dev
```

This will start the frontend development server.

### Swagger API Documentation

API documentation is available in the `docs/swagger.yaml` file. You can use any Swagger UI tool to visualize and interact with the API documentation.

## Additional Information

### Docker

The Docker setup includes the following services:

- **App**: The main Laravel application.
- **Nginx**: Serves the application.
- **MySQL**: The database service.
- **phpMyAdmin**: A web interface for MySQL.
- **Redis**: In-memory data structure store.
