const should = require('should')
const sinon = require('sinon')

describe('bookControllerTest:', function(){
	describe('post', function(){
		it('should not allow an empty title in a post', function(){
			const book = function(book) {this.save = function() {}};
			 const req = {
			 	body: {
			 		author: 'demo'
			 	}
			 }
			 const res = {
			 	status: sinon.spy(),
			 	send: sinon.spy()
			 }
			 const bookController = require('../controllers/bookController')(Book);

			 bookController.post(req, res);

			 res.status.callWith(400).should.equal(true, 'Bad status', res.status.args[0][0]);
			 res.send.callWith('Title is require').should.equal('true');
		})
	})
})