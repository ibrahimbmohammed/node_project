const express = require('express');
const router = express.Router();


const auth = require('./auth/auth.route');
const customers = require('./customers/customer.route');
const state = require('./states/state.route');



router.get('/',(req,res)=>{
    res.json({
        message:"hello world"
    })
})

router.use('/auth',auth);
router.use('/customers',customers);
router.use('/state',state);






module.exports= router;