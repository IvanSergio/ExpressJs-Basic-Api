const path = require('path');
const User = require('../Models/Users');
const md5 = require('md5');

exports.create = function (req, res) {
    console.log("Model User - Create - Body: ", req.body);
    req.body.password = md5(req.body.password);
    var newUser = new User(req.body);
    console.log("Nuevo Usuario ", newUser);
    newUser.save(function (error, user) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(201).send({ user });
    });
};

exports.update = function (req, res) {
    var userId = req.params.id || null;
    if (userId == null) return res.status(404).send({ message: 'Userid no válido' });
    console.log(req.body);
    User.findByIdAndUpdate(userId, req.body, { new: true }, function (error, user) {
        if (error) {
            res.status(400).send({ message: error });
        }
        return res.status(201).send({ user });
    });
};

exports.list = function (req, res) {
    User.find({}).exec(function (error, users) {
        if (error) {
            return res.status(500).send({ message: error });
        }
        return res.status(200).send({ users });
    });
};

exports.byId = function (req, res) {
    var userId = req.params.id || null;
    if (userId == null) return res.status(404).send({ message: 'Userid no válido' });
    User.findById(userId).exec(function (error, user) {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ user });
    });
};
