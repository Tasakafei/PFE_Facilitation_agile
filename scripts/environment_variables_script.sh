#!/usr/bin/env bash

cd ../configurations/env
while read line;
do export "$line";
done < server.env

echo [SUCCESS] Environment variables exported !
