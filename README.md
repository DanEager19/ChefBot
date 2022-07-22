# Chef-Bot
<p>
    A Discord Bot that interfaces with my Kitchenware Request API as an endpoint for reservations. Also acts as a role reaction bot.
</p>

## Dependencies:
```sh
This app requires Node.JS version 16 or later OR the latest Docker engine.
```

## Installation:
```sh
git clone https://github.com/DanEager19/chef-bot
cd chef-bot
yarn install
```

## Testing:
```sh
yarn test
```

## Usage:
Note that a the environment variablesneeded to launch the app are NOT included. If you fork the project, you will need your own credentials. 

---
### Build from files:
Compile the project:
```sh
yarn build
```
Running in development environments:
```sh
yarn start:dev
```
Running in production environments:
```sh
yarn start:prod
```
### Or build from Dockerfile:
Build the docker container:
```sh
yarn build:container
```
Run the container:
```sh
yarn run:container
```
## Author:

**Daniel Eager**

* Website: https://deager.dev/
* Github: [@DanEager19](https://github.com/DanEager19)