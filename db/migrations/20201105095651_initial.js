const { customer, category, country, state, manufacturer, dimension ,address,manu_type} = require("../../src/constants/tablenames");



/**
 @param{knew}knex
 */
const tableNames = require('../../src/constants/tableNames');
function references(table,tableNames){
  table.integer(`${tableNames}_id`).unsigned().references('id').inTable('tableNames')
}

const addDefaultTables =(table)=>{
    table.timestamps(false,true)
    
}


exports.up =async function(knex) {
  await Promise.all([

  knex.schema.createTable(tableNames.customer,(table)=>{
    table.increments().notNullable();
    table.string('email',254).notNullable().unique();
    table.string('first_name',50).notNullable();
    table.string('last_name',50).notNullable();
    table.string('password').notNullable();
    table.datetime('last_login')
    addDefaultTables(table)
}) ,
 knex.schema.createTable(tableNames.category,(table)=>{
  table.increments().notNullable();
  table.string('category_name',100).notNullable().unique();
  addDefaultTables(table)
}),
 knex.schema.createTable(tableNames.country,(table)=>{
 table.increments().notNullable();
 table.string('name',254).notNullable().unique();
 addDefaultTables(table)
}), knex.schema.createTable(tableNames.manu_type,(table)=>{
  table.increments().notNullable();
  table.string('name',254).notNullable().unique();
  addDefaultTables(table)
 }),
knex.schema.createTable(tableNames.state,(table)=>{
 table.increments().notNullable();
 table.string('name',254).notNullable().unique();
 addDefaultTables(table)///think about adding this colunms
}),
knex.schema.createTable(tableNames.dimension,(table)=>{
 table.increments().notNullable();
 table.decimal('length',38,6)
 table.decimal('height',38,6)
 table.decimal('wieght',38,6)
 addDefaultTables(table)
}),
 knex.schema.createTable(tableNames.reset_password,(table)=>{
  table.increments().notNullable();
  table.string('email',254)
  table.string('reset_token',2000)
  addDefaultTables(table)
 })

 ])
//// start of tables with dependencies
await knex.schema.createTable(tableNames.address,(table)=>{
  table.increments().notNullable();
  table.string('address_line_1').notNullable();
 table.string('address_line_2')
 table.string('city')
 table.string('zip_postcode')
table.float('longitude')
table.float('latitude')
table.integer('customer_id').unsigned().references('id').inTable('customer').onDelete('cascade')
table.integer('country_id').unsigned().references('id').inTable('country').onDelete('cascade')
table.integer('state_id').unsigned().references('id').inTable('state').onDelete('cascade')
 
})
await knex.schema.createTable(tableNames.manufacturer,(table)=>{
  table.increments().notNullable();
  table.string('manufacture_name').notNullable().unique();
  table.string('email',254)
  table.string('address',50)
  table.string('phone')
  table.string('manufacturer_logo_url',2000)
  table.string('website_url',2000)
  table.integer('manu_type_id').unsigned().references('id').inTable('manu_type').onDelete('cascade')
  addDefaultTables(table)
 })

};

// exports.down =async function(knex) {
//  return await Promise.all([manufacturer,address,customer,category,country,state,manu_type,dimension].map((tablename)=>{knex.schema.dropTable(tablename)}))
// };
exports.down =async function(knex) {
    return knex.schema
      .dropTable(tableNames.manufacturer)
      .dropTable(tableNames.address)
      .dropTable(tableNames.customer)
      .dropTable(tableNames.category)
      .dropTable(tableNames.country)
      .dropTable(tableNames.state)
      .dropTable(tableNames.manu_type)
      .dropTable(tableNames.dimension);
  
 };