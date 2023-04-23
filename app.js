require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');


const app = express();
const port = 5000 || process.env.PORT;

// // initializing passport
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// connecting to the mongo database
connectDB();

//linking static files
app.use(express.static('public'));

//setting the ejs templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine','ejs');


//Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// handling 404 route error
app.get("*",(req,res)=>{
    res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}...`)
});