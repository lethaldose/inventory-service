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
    - It has properties describing its configuration - adSpotLength, maxAdLoopTime, maxAdvertisers etc
    - It has properties which describe its pyhysical location in the shopping-centre like: floor, mainCorridor, shopNumber etc.

## Project Structure

```
├── src - service source files
|      ├── db - migration files (using sequelize)
|      ├── schemas - request/response parsers and schema validators
|      ├── models
|      ├── controllers
├── test - integration and unit tests
```

## Environment Requirement

-   Node 6.10 (node 6 should work fine too)
-   Postgresql 9.6 (9.4 and above should work too)

## API

| Path                                                   | Method |
| ------------------------------------------------------ | ------ |
| /shopping-centre/{id}                                  | GET    |
| /shopping-centre                                       | POST   |

## Quick Start

1. Clone the repo
2. `npm i` to install node packages
3. Setup Development DB
    - `createdb inventory_store_development`
    - `node_modules/.bin/sequelize db:migrate`
4. Run `npm start` to start the app

## Testing

1. There are unit test and integration tests for controller and models
2. Setup Test DB
    - `createdb inventory_store_test`
    - `NODE_ENV=test node_modules/.bin/sequelize db:migrate`
3. `npm test` to run tests

