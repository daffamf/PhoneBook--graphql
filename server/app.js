var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const { graphqlHTTP } = require("express-graphql")
const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyDga4IQ0kQyxMjfbX0rvs_15m6G-hm-yC0 ",
    authDomain: "phonebookdb-8daadm",
    databaseURL: "https://phonebookdb-8daad-default-rtdb.firebaseio.com",
    projectId: "phonebookdb-8daad",
    storageBucket: "phonebookdb-8daad.appspot.com",
    messagingSenderId: "1070783608183",
  };
firebase.initializeApp(config)

var indexRouter = require('./routes/index');
var ApiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api',ApiRouter);

const phonebookSchema = require('./graphql').phonebookSchema;
app.use('/graphql', cors(), graphqlHTTP({
    schema: phonebookSchema,
    rootValue: global,
    graphiql: true
}))

module.exports = app;