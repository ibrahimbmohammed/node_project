
const { customer, category, country, state, manufacturer, dimension ,address,manu_type} = require("../../src/constants/tablenames");
const stateData = require('../seedData/stateData')
const countryData = require('../seedData/countryData')
exports.seed =  async function(knex) {
  // Deletes ALL existing entries
await [manufacturer,address,customer,category,country,state,manu_type,dimension].reduce(async(promise,tablename)=>{
  await promise;
  return knex(tablename).del()
},Promise.resolve())
  
    .then(function () {
      // Inserts seed entries
      return knex(state).insert([
       ...stateData
      ]);
    });

    await knex(country).insert([...countryData])
};
// {id: 1, colName: 'rowValue1'},