# Inventory Service

## Intro

There are 2 main functions for this service:

-   Managing ShoppingCentre
-   Managing Assets for ShoppingCentre


## Schema

Refer `src/schemas/schema.js` for detailed JSON schema.

1. ShoppingCentre:
    - A shopping typically has name, description an address.
    - It may have many assets associated with it

2. Asset:
    - An asset has name, description
    - It also has physical dimension attributes
    - It has properties describing its configuration and capability - adSpotLength, maxAdLoopTime, maxAdvertisers, beaconRFIDEnabled etc.
    - It has properties which describe its pyhysical location in the shopping-centre like: floor, mainCorridor, shopNumber etc.
    - It has properties to describe how asset is displayed or mounted



## Authentication
1. Uses jwt for authenticating requests. Token is set `x-access-token` in request header

## Environment Requirement

-   Node 6.10 (node 6 should work fine too)
-   Postgresql 9.6 (9.4 and above should work too)

## API

| Path                                                    | Method |
| ------------------------------------------------------- | ------ |
| /shopping-centres/{id}                                  | GET    |
| /shopping-centres                                       | POST   |
| /shopping-centres/{id}/assets                           | GET    |
| /assets/{id}                                            | GET    |
| /assets                                                 | POST   |
| /assets/{id}                                            | PUT    |
| /authenticate                                           | POST   |


## Project Structure

```
├── src - service source files
|      ├── db - migration files (using sequelize)
|      ├── schemas - request/response parsers and schema validators
|      ├── models
|      ├── controllers
├── test - integration and unit tests (using mocha/shouldjs)
```

## Quick Start

1. Clone the repo
2. `npm i` to install node packages
3. Setup Development DB
    - `createdb inventory_store_development`
    - `node_modules/.bin/sequelize db:migrate`
    - `node_modules/.bin/sequelize db:seed:all`
4. Run `npm start` to start the app
5. Run `npm test` to run specs
6. Run `npm run lint` to run es6 linter

## Config
1. App config.js at `src/config.js`
2. DB config at `configs/database.json`

## Database

1. Create db user `CREATE USER developer WITH PASSWORD 'developer';`
2. Create dev db
    - From psql cli - `CREATE DATABASE inventory_store_development;`
    - OR from terminal `createdb inventory_store_development`
3. grant access
    - `GRANT ALL PRIVILEGES ON DATABASE inventory_store_development to developer;`
4. Run migrations `node_modules/.bin/sequelize db:migrate`
5. Create test user and dummy data `node_modules/.bin/sequelize db:seed:all`
    - Creates dummy users `testuser1/roger@123`

## Testing

1. There are unit test and integration tests for controller and models
2. Setup Test DB
    - `createdb inventory_store_test`
    - `NODE_ENV=test node_modules/.bin/sequelize db:migrate`
3. `npm test` to run tests

## Sample requests using cURL

##### POST Authenticate User
```
curl -X POST \
  http://localhost:3000/authenticate \
  -H 'content-type: application/json' \
  -H 'postman-token: 0dbebd8a-3d43-1702-ac47-fbdd259e54bd' \
  -d '{
  "username": "testuser1",
  "password": "dummy"
}'
```
##### POST Create shopping centre
```
curl -X POST \
  http://localhost:3000/shopping-centres \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUxMjUwNzg2NywiZXhwIjoxNTEyNTExNDY3fQ.OtQaFY4sB1aj9DDjpXe_9oRykZeL14MM_qM1V5Z6e7Q' \
  -d '{
  "name": "Westfield",
  "address": {
    "streetNumber": "11",
    "streetName": "Victoria",
    "suburb": "Chatswood",
    "postCode": 2065,
    "state": "NSW",
    "country": "AUS"
  }
}'
```
##### GET shopping centre
```
curl -X GET \
  http://localhost:3000/shopping-centres/169 \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUxMjUwNzg2NywiZXhwIjoxNTEyNTExNDY3fQ.OtQaFY4sB1aj9DDjpXe_9oRykZeL14MM_qM1V5Z6e7Q'
```

#### POST Create Asset
```
curl -X POST \
  http://localhost:3000/assets \
  -H 'content-type: application/json' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEyNTE1MTE1LCJleHAiOjE1MTI1MTg3MTV9.rxpMiN2KikGrHipdPsbk2_EPu3pcwKgs4UFBc_amHsY' \
  -d '{
      "name": "Asset1",
      "ShoppingCentreId": 6,
      "status": "active",
      "dimensions": {
        "height": 55,
        "width": 47,
        "unit": "cm"
      },
      "location": {
        "floor": "B-2"
      }
    }'
```

## Pending Improvements
1. Enhance Asset model. Schema allows for more properties on the object
2. API Docs using Swagger
3. Tests
     - improve test setup
4. DB improvments
    - whitelisting attributes to update at model level
    - fix foreignKey ShoppingCentreId to be lowercase
5. Route to create users
