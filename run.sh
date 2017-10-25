#! /bin/bash

docker stop git-wetty || true

docker build -t git-wetty .

docker run --name git-wetty -p 127.0.0.1:4123:4123 -dt git-wetty
