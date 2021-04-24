const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();
const api = require('./api');
const cookie = require('cookie');
const { v4: uuidv4 } = require('uuid')
const middlewares = require('./middlewares');
require("dotenv").config();

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

//app.set('view engine', 'html');
app.use('/api/v1',api)
/////where to keep all your api route//
app.use('/home',async (req,res)=>{


 const test1 = req.cookies.test1
 console.log(test1)
 if(!test1){
   const userId = uuidv4()
  res.cookie('test1', userId, { httpOnly:true,secure:process.env.NODE_ENV !== 'development', sameSite:'strict',maxAge:900000,path:'/'})
 }
 

  var oldCookie = req.cookies.test;
  var newCookie = (oldCookie|0) + 1;
  res.cookie('test', newCookie, {maxAge: 900000});

  res.status(200).json({
    newCookie: newCookie,
    oldCookie: oldCookie,
    reqCookie: req.cookies.test})
 

})



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;


