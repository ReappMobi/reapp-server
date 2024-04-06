# Reapp
O backend do projeto Reapp

## Preparando o ambiente
- NodeJS 20.x LTS
- Docker

## Baixando o projeto
```sh
git clone http://200.137.132.247:9000/telemidia/reapp-backend.git

cd reapp-backend
npm install
```

## Iniciando o ambiente docker - Desenvolvimento
```sh
docker-compose -f compose-dev.yaml build
docker-compose -f compose-dev.yaml up
```