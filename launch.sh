docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images |grep 'dlc/projet')
docker build -t dlc/projet .
docker run -p 8000:8000 -d dlc/projet
docker run -p 8001:8000 -d dlc/projet
npm test
