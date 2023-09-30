# mariausapi

## Used libraries:
* express - server framework
* mongoose - connection to MongoDB
* nodemon - hot reload for dev enviroment
* typescript - language

## How to start:

1. Pull the repo
   * E.g.: `git clone https://github.com/edvrie/mariausapi.git`
2. cd into the root folder
    * E.g.: `cd ./mariusapi`
3. Install all dependencies
   * E.g.: `npm i`
4. Create a `.env` file in the root folder
   * Configure a variable called `MONGO_URI` and add the connection string to the MongoDB database [ref](https://www.mongodb.com/docs/drivers/node/current/quick-start/)
   * (Optional) configure a variable called `PORT` to define the port on which the server should be hosted
5. Run `npm start` to start the server or `npm run dev` to run the development enviroment
