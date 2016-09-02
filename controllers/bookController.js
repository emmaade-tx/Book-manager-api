const bookController = function(Book) {
	const post = function(req, res) {
		const book = new Book(req.body);
		book.save()
		res.status(201).send(book);
	}

	const get = function(req, res) {
		const query = {}
		if (req.query.genre) {
			query.genre = req.query.genre
		}		
		Book.find(query, function(err, books) {
			if (err) {
				res.status(500).send(err);
			}
			res.json(books);
		});
	}
	return {
		post: post,
		get: get
	}
}
module.exports = bookController