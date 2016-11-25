#!/usr/bin/env bash

cd ../configurations/
while read line;
do export "$line";
done < env.env
cd ../

echo [SUCCESS] Environment variables exported !
