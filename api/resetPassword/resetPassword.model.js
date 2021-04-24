const {Model}  = require('objection');
const tableNames = require('../../src/constants/tableNames')
 class Reset extends Model{
     static get tableName(){
         return tableNames.reset_password;
     }

     static get jsonSchema(){
         return
     }
 }  

 module.exports = Reset;