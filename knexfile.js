// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
    database:"mynewone",
    user:"postgres",
    password:"1234"
    },
    migrations:{
      directory:"./db/migrations"
    },
    seeds:{
      directory:"./db/seeds"
    }
  },
  test: {
    client: 'pg',
    connection: {
    database:"mynewone",
    user:"postgres",
    password:"1234"
    },
    migrations:{
      directory:"./db/migrations"
    },
    seeds:{
      directory:"./db/seeds"
    }
  }
};
