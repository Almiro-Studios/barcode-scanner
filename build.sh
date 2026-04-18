version=1.2

version=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' ./package.json)

export VERSION=$version

#export DOCKER_DEFAULT_PLATFORM=linux/amd64 COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1; docker-compose --env-file variables.env build frontend --build-arg GH_TOKEN=$GH_TOKEN
export DOCKER_DEFAULT_PLATFORM=linux/amd64 COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1; docker-compose --env-file variables.env build v8-web-scanner --build-arg GH_TOKEN=$GH_TOKEN

docker-compose --env-file variables.env push $1

docker tag "mikaelx/v8-web-scanner:${version}" mikaelx/v8-web-scanner:latest

export VERSION="latest"

docker-compose --env-file variables.env push $1

echo "Pushing Webhook to auto deploy new image on docker-prod-online / v8-web-scanner"
curl -X POST https://portainer.almiro.se/api/webhooks/8c3f24bf-0461-4537-b0b4-8877c2b1fd1c