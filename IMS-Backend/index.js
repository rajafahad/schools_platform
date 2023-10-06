require('module-alias/register')
const express = require("express");
const cors =  require("cors");
const morgan = require("morgan");
require('express-async-errors');
const connectDb = require("./app/config/dbConnection")





//* Initialization *//
//.................................................................../
require('dotenv').config();
const Port = process.env.PORT || 8000;
const app = express();



//* Express and Third party Middleware *//
//.................................................................../
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





//* Custom Middleware *//
//.................................................................../







//* Routes *//
//.................................................................../
app.use("/",require("./app/Routes/indexRoute"));




//! Alert: Error Handler must in Last,Then it's worked
//* Custom Async Error handler Middleware *//
app.use(require("./app/middleware/errorHandler"))

//* MongoDB Connection *//
//.................................................................../
connectDb();

//< Running Server
//.................................................................../
app.listen(Port,()=>{console.log(`Server is running on http://localhost:${Port}/`)});