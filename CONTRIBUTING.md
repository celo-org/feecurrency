# Contributing

## Basic guide

This guide is intended to help you get started with contributing. By following these steps,
you will understand the development process and workflow.

### Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```sh
$ git clone https://github.com/celo-org/feecurrency.git
```

Navigate to the project's root directory:

```sh
$ cd developer-tooling
```

### Installing Node.js

We use [Node.js](https://nodejs.org/en/) to run the project locally.
You need to install the **Node.js version** specified in [.nvmrc](./.nvmrc). To do so, run:

```sh
$ nvm install
$ nvm use
```

### Installing dependencies

Once in the project's root directory, run the following command to install the project's 
dependencies:

```sh
$ yarn install
```

After installing the dependencies, the project is ready to be run. 

```sh
$ yarn ts-node <scrip-name>
```