#!/bin/bash
docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q 'dlc/projet')
docker build -t dlc/projet .

counter=0
while [ $counter -lt $1 ]
do
	docker run --cpus="0.1" --memory="100m" -p 800$counter:8000 -d dlc/projet
	((counter++))
done
docker run --cpus="0.1" --memory="100m" --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=9000:8080 --detach=true --name=cadvisor google/cadvisor:latest
