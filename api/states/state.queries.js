const { update } = require('../../db/knex');
const knex = require('../../db/knex');
module.exports = {

    getAll(){
        return knex.select('*').from('state');
    },

    getSearched(query){
   const knexQuery =  knex('state')
    if(query.name){
        knexQuery.where('name', 'like', `%${query.name}%`)
    }

    return knexQuery
    }, 

    getOne(id){
        console.log(id)
        return knex('state').where("id", id).first()   },
    create(product){
        return knex('state').insert(product ,'*')
    },
    update(id,product){
      return knex('state').where('id',id).update(state)
    },
    delete(id){
        return knex('state').where('id',id).del()
    }
}