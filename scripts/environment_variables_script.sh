#!/usr/bin/env bash

cd ../configurations/
while read line;
do export "$line";
done < env.env

echo [SUCCESS] Environment variables exported !
