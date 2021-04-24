const { update } = require('../../db/knex');
const knex = require('../../db/knex');

module.exports = {
    getAll(query){
   const knexQuery =  knex('products')
    if(query.title){
        knexQuery.where('title', 'like', `%${query.title}%`)
    }
    if(query.price){
        knexQuery.where('price', '<', query.price)
    }
   
    return knexQuery
    }, 

    getOne(id){
        return knex('products').where("id", id).first()   },
    create(product){
        return knex('products').insert(product ,'*')
    },
    update(id,product){
      return knex('products').where('id',id).update(product)
    },
    delete(id){
        return knex('products').where('id',id).del()
    }
}