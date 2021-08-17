#!/bin/bash

mkdir build
mkdir node_modules
cd docker/fresh_docker/ 
docker-compose build
docker-compose up

