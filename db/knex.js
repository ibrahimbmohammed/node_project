const enviroment = process.env.NODE_ENV || 'development';
// enviroment varialble helps with determining if the database is to be connected locally or otherwise,
const {Model}  = require('objection');
const config = require('../knexfile');
/// requires the knex config file that was generated initiallu
const enviromentConfig = config[enviroment]
// setting the Enviroment config
const knex = require('knex');


// getting knex from node_modules

const connection = knex(enviromentConfig);
// just to make things a little fancy
Model.knex(connection)
module.exports = connection;



///////////////////////////////////////////////////// TRIALs.................//////////////////////////
// 5 lines of code ...
/// enviroment , deermining whether it is a development or production enviroment,
/// config ,  requires the knexflie
/// enviromentConfig = config + enviroment ,config[enviroment] merge both files
// knex module knex(enviromentConfig) , gets knex module, it servers as a container for both of the earlier configurations and named connection
/// connecton
//ece+Ckc

