// Imports
const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const morgan = require('morgan');

const config = require('./config');

const AuthRouter = require('./routes/auth.route');

// Configure app Preprocessors
var app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Listen to Port

const PORT=config.PORT;
app.listen(PORT);

// Configure API Endpoints
app.use('/api/auth', AuthRouter);

// Configuring MongoDB Connection
const URL = config.mongoUrl;

mongoose.set('useCreateIndex', true);
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'));

// Error handling
app.use(function(err, req, res, next) {  
    res.status(err.status || 500);
    res.end(err.message);
});


// Exports
module.exports = app;