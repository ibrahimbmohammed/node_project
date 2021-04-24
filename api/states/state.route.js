const express = require('express');
const router = express.Router();
const queries = require('./state.queries')

const State = require('./state.model')


router.get('/',async(req, res)=>{
 try {
 const states = await State.query();
 res.json({states})    
 } catch (error) {
    res.json({error: err})
 }
})

// router.get('/',(req, res)=>{
//     State.query()
//     .then((state)=>{ 
//         res.json({state})
//     }).catch((err)=>{
//         res.json({error: err})
//     })
// })

// router.get('/',(req, res)=>{
//     queries.getAll()
//     .then((state)=>{ 
//         res.json({state})
//     }).catch((err)=>{
//         res.json({error: err})
//     })
// })
router.get('/:id',(req,res)=>{
    queries.getOne(req.params.id)
    .then((data)=>{
        res.json({data})
    }).catch((err)=>{
        res.json({error:err})
    })
})
module.exports = router