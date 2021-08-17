#!/bin/bash

yarn
yarn start &
json-server -H 0.0.0.0 -p 3500 -w data/db.json

# npm install -g serve
# serve -s build -l 80
