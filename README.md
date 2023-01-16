# HEIG_DAI_HTTP_Infrastructure

Authors: Jarod Streckeisen, TImothée Van Hove



## Getting started

### Install Docker

Firstly, you must install Docker on your local machine (see the [Docker documentation](https://www.docker.com/get-started/)).

Then clone this repo, open your terminal in the project directory and run :

```
docker-compose up
```

### Run containers

You can either run container individually from the terminal or by using the web interface.

In the docker-compose.yml file, you can change the configuration and decide the number static/ dynamic server instances you want to run by changing the "replicas"parameters:

```
static:
    build: ./Static server
    deploy:
      replicas: 3

  express:
    build: ./Express server
    deploy:
      replicas: 3
```



## Project description



### Overview



### Docker configuration



### Static server



### Dynamic server



### Reverse Proxy



### Web user interface

