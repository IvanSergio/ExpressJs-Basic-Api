var Categorie = require('../Models/Categories');

exports.list = function (req, res) {
    console.log("Get :" + req)
    Categorie.find({}).exec(function (error, Categorie) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(200).send({
            Categorie
        });
    })
};

exports.byId = function (req, res) {
    console.log("GetById :" + req.params.id);
    var categorieId = req.params.id || null;
    Categorie.findById(categorieId).exec(function (error, Categorie) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(200).send({
 
            Categorie
        });
    })
};

exports.create = function (req, res) {
    var newCategorie = new Categorie(req.body);
    console.log("Create :" + newCategorie)
    newCategorie.save(function (err, Categorie) {
        if (err) {
            res.status(400).send({ message: err });
        }
        return res.status(201).send({ Categorie });
    });
};

exports.update = function (req, res) {
    var categorieId = req.params.id || null;
    console.log("Update :" + req.params.id)
    if (categorieId == null) return res.status(404).send({ message: 'CategoryId no válido.' });
    Categorie.findByIdAndUpdate(categorieId, req.body, { new: true }, function (err, Categorie) {
        if (err) {
            res.status(400).send({ message: err });
        }
        return res.status(201).send({ Categorie });
    });
};

exports.delete = function (req, res) {
    var categorieId = req.params.id || null;
    console.log("Delete :" + req.params.id)
    if (categorieId == null) return res.status(404).send({ message: 'CategoryId no válido.' });
    Categorie.findByIdAndDelete(categorieId, function (error, Categorie) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(201).send({ message: "Category Eliminado!" });
    });
};