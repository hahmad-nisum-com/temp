#!/bin/bash

./gradlew clean build

cd auth && docker build . -t auth-service:v1 && cd ../
cd gateway && docker build . -t gateway-service:v1 && cd ../
cd service-discovery && docker build . -t service-discovery-service:v1 && cd ../
cd user && docker build . -t user-service:v1 && cd ../

docker run --restart always -d --name auth-service --network host --expose 7120 auth-service:v1
docker run --restart always -d --name gateway-service --network host --expose 9080 gateway-service:v1
docker run --restart always -d --name service-discovery-service --network host --expose 9110 service-discovery-service:v1
docker run --restart always -d --name user-service --network host --expose 9150 user-service:v1