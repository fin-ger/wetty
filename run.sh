#! /bin/bash

docker rm git-wetty || true
docker stop git-wetty || true

if [[ "$1" == "rebuild" ]]
then
    docker build -t git-wetty .
fi

docker run --rm -h ovgu --name git-wetty -p 127.0.0.1:4123:4123 -dt git-wetty
