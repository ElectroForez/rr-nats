# Request-Reply - NATS
Реализовать микросервис api, основная задача которого - принимать запросы от клиента и направлять их в микросервис storage с помощью системы обмена сообщениями NATS. В качестве примера взаимодействия микросервисов необходимо реализовать тестовый маршрут GET api/test, который публикует сообщение в NATS.

Реализовать микросервис storage, основная задача которого - принимать запросы от микросервиса api и вызывать соответствующие методы репозитория. В качестве примера взаимодействия микросервисов, необходимо подписаться на сообщение, опубликованное в микросервисе api и указать тестовый обработчик, который вызывает метод find репозитория test.

## Install
````
git clone https://github.com/ElectroForez/rr-nats.git
cd rr-nats
npm install
````

## Run

````
npm start
````
or docker-compose
```
docker-compose up
```

## Example of usage
get test
```
curl 'http://localhost:3000/api/test/1'
```

post test
````
curl --location --request POST 'http://localhost:3000/api/test/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "test data"
}'
````

## Swagger
After run, swagger is available on:

http://localhost:3000/documentation
