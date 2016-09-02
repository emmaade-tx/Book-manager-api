const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/v1/books', bookRouter);
// app.use('/api/v1/author', authorRouter);

// app.get('/', function(req,res) {
// 	res.send('Welcome to my API');
// });

app.listen(port, function() {
	console.log('Gulp is running my app on PORT: ' + port);
});