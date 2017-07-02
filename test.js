
// ES5 express 
// ES6 Koa1.0  ->alibaba egg
// ES7 Koa2.0

// var ES5
// let const ES6 

const name = 'jinzhi';
name = 'xiaohouzi';

var express = require('express');

let mongoose = require('mongoose');
let redis = require('redis');
// let mysql = requir('mysql');

let sequelize = require('sequelize');   //mysql

var userShame = mongoose.Schema({
    id:{type:Nuber},
    name:{type:String},
});
var userModel = new Model('user',userShame);

var 



var app = express();

app.listen(9090);


