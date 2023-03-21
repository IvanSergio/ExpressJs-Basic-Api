var Books = require('../Models/Books');

exports.list = function (req, res) {
    console.log("Get :", req.body)
    Books.find({}).exec(function (error, books) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(200).send({
            books
        });
    })
};

exports.byId = function (req, res) {
    console.log("GetById :", req.params.id);
    var bookId = req.params.id || null;
    Books.findById(bookId).exec(function (error, books) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(200).send({

            books
        });
    })
};

exports.create = function (req, res) {
    var newBooks = new Books(req.body);
    console.log("Create :", newBooks)
    newBooks.save(function (err, books) {
        if (err) {
            res.status(400).send({ message: err });
        }
        return res.status(201).send({ books });
    });
};

exports.update = function (req, res) {
    var bookId = req.params.id || null;
    console.log("Update :", req.params.id)
    if (bookId == null) return res.status(404).send({ message: 'BookId no válido.' });
    Books.findByIdAndUpdate(bookId, req.body, { new: true }, function (err, books) {
        if (err) {
            res.status(400).send({ message: err });
        }
        return res.status(201).send({ books });
    });
};

exports.delete = function (req, res) {
    var bookId = req.params.id || null;
    console.log("Delete :", req.params.id)
    if (bookId == null) return res.status(404).send({ message: 'BookId no válido.' });
    Books.findByIdAndDelete(bookId, function (error, books) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(201).send({ message: "Eliminado!" });
    });
};