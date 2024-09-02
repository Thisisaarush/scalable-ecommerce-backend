# ⭐️ [Scalable E-commerce Backend (Microservices)](https://roadmap.sh/projects/scalable-ecommerce-platform)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker
- Nginx
- Kubernetes
- Stripe

## Services & Features

- [x] User Service: Handles user registration & authentication.
- [x] Product Service: Manages product listings, categories, and inventory.
- [x] Shopping Cart Service: Manages users’ shopping carts, including adding/removing items and updating quantities.
- [x] Order Service: Processes orders, including placing orders, tracking order status, and managing order history.
- [x] Payment Service: Handles payment processing, integrating with `Stripe` payment gateway.
- [x] Notification Service: Sends email and SMS notifications using `NodeMailer` and `Twilio`.

## Architecture

- **Microservices Architecture**: Each service is a separate codebase, with its own database.
- **API Gateway & Load Balancing**: `Nginx` is used as an API gateway to route requests to the appropriate service and as a Load Balancer to distribute the load across multiple instances of the same service.
- **Containerization**: `Docker` is used to containerize each service, making it easy to deploy and scale the services.
- **Deployment**: `Kubernetes` is used to deploy and manage the services in a production environment, providing scalability, fault tolerance, and self-healing capabilities.
- **CI/CD Pipeline**: `Github Actions` is used for CI/CD to automate the deployment process, including building, testing, and deploying the services.
- **Database**: `MongoDB` is used as the database for all services, providing a flexible schema and scalability. `Mongoose` is used as the ODM to interact with MongoDB.
- **Authentication & Authorization**: `JWT` is used for authentication and `argon2` is used for password hashing.

## Pre-requisites

- Docker & Docker Compose should be installed.

  ```bash
  docker --version
  docker compose version
  ```

- Create and update all `.env` files with the required values for each service.

## How to run the project using docker (Recommended)

```bash
docker compose up --build
```

Here `--build` is used to build the image again if there are any changes in the code.

## Github Actions (CI/CD) Requirements

- Add `DOCKER_USERNAME` & `DOCKER_PASSWORD` to github secrets to push the image to docker hub.
