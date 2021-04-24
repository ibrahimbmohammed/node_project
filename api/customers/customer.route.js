const express = require('express');
const router = express.Router();
//const queries = require('./state.queries')

const Customer = require('./customer.model')


router.get('/',async(req, res)=>{
 try {
 const customers = await Customer.query();
 res.json({customers})    
 } catch (error) {
    res.json({error: err})
 }
})



module.exports = router