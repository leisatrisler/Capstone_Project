#!/bin/sh

rm -rf dist
cd client
npm run build
cd ..
flask run
