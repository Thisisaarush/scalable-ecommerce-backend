# Scalable E-commerce Backend (Microservices)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker
- Nginx
- Kubernetes
- Stripe

## How to run the project using docker (Recommended)

```bash
docker compose up --build
```

Here `--build` is used to build the image again if there are any changes in the code.

## Github Actions (CI/CD)

- Add `DOCKER_USERNAME` & `DOCKER_PASSWORD` to github secrets to push the image to docker hub.
