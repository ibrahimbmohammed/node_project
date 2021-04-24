const {Model}  = require('objection');
const tableNames = require('../../src/constants/tableNames')
 class State extends Model{
     static get tableName(){
         return tableNames.state;
     }

     static get jsonSchema(){
         return
     }
 }  

 module.exports = State;