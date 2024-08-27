# Puppeteer Boilerplate

This is a boilerplate project for using Puppeteer with Docker Compose. It includes a CI configuration for deployment to an AWS EC2 instance.

## Table of Contents

- [Puppeteer Boilerplate](#puppeteer-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Running Tests](#running-tests)
  - [Deployment](#deployment)
    - [GitHub Actions CI](#github-actions-ci)
    - [Manual Deployment](#manual-deployment)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have Docker and Docker Compose installed on your local machine.
- You have an AWS EC2 instance set up and accessible.
- You have the necessary AWS credentials and SSH keys configured.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/puppeteer-boilerplate.git
    cd puppeteer-boilerplate
    ```

2. Create a `.env` file in the root directory and add your environment variables:

    ```sh
    touch .env
    ```

    Example `.env` file:

    ```env
    NODE_ENV=development
    ```

## Usage

To start the application using Docker Compose, run:

```sh
docker-compose up --build
```

This will build the Docker image and start the application.

## Running Tests

To run tests, use the following command:

```sh
docker-compose run puppeteer npm test
```

## Deployment

This project includes a GitHub Actions CI configuration for deploying to an AWS EC2 instance.

### GitHub Actions CI

1. Ensure you have the following secrets set up in your GitHub repository:

    - `AWS_EC2_HOST`: The hostname or IP address of your EC2 instance.
    - `SSH_PRIVATE_KEY`: The private SSH key for accessing your EC2 instance.
    - `ENV_FILE`: The contents of your `.env` file.

2. The CI configuration file (`.github/workflows/deploy.yml`) will handle the build and deployment process. It will:

    - Build the Docker image.
    - Save the Docker image to a file.
    - Copy the Docker image to the EC2 instance.
    - Deploy the Docker image on the EC2 instance.

### Manual Deployment

To manually deploy the application to your EC2 instance:

1. Build the Docker image:

    ```sh
    docker build -t puppeteer-boilerplate .
    ```

2. Save the Docker image to a file:

    ```sh
    docker save puppeteer-boilerplate -o image.tar
    ```

3. Copy the Docker image to your EC2 instance:

    ```sh
    scp -i path/to/your/private-key.pem image.tar ec2-user@your-ec2-host:/home/ec2-user/
    ```

4. SSH into your EC2 instance and load the Docker image:

    ```sh
    ssh -i path/to/your/private-key.pem ec2-user@your-ec2-host
    docker load -i /home/ec2-user/image.tar
    ```

5. Run the Docker container:

    ```sh
    docker run -d --name puppeteer-boilerplate --env-file /home/ec2-user/.env puppeteer-boilerplate
    ```

## Contributing

Contributions are always welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.