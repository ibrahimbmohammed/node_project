const {Model}  = require('objection');
const tableNames = require('../../src/constants/tableNames')
const customerSchema = require('./customer.schema.json')
 class State extends Model{
     static get tableName(){
         return tableNames.customer;
     }

     static get jsonSchema(){
         return  customerSchema;
     }
 }  

 module.exports = State;