const express = require('express');

const routes = function(Book) {
	bookRouter = express.Router();
	const bookController = require('../controllers/bookController')(Book)
	bookRouter.route('/')
	.post(bookController.post)
	.get(bookController.get)
    bookRouter.use('/:id', function(req, res, next) {
    	Book.findById(req.params.id, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else if(book) {
				req.book = book; 
				next();
			} else
			res.status(404).send('no book found');
		});
    });
    bookRouter.route('/:id')
		.get(function(req, res) {
			res.json(req.book);
		})
		.put(function(req, res) {
			req.book.title = req.body.title;
			req.book.author = req.body.author;
			req.book.genre = req.body.genre;
			req.book.read = req.body.read;
			req.book.save(function(res, req) {
				if (err) {
					res.status(500).send(err);
				}
				res.json(req.book);
			});
			res.status(201).send(req.book);
		})
		.patch(function(req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			for(const p in req.body) {
				req.book[p] = req.body[p];
			}
			req.book.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
				res.json(req.book);
			});
		})
		.delete(function(req, res) {
			req.book.remove(function(err) {
				if (err) {
					res.status(500).send(err);
				}
				res.status(204).send('removed successfully');
			});
		});

	return bookRouter;
}

module.exports = routes;
