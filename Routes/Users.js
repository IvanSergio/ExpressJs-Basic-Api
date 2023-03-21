const express = require('express');
const router = express.Router();
const user = require('../Controllers/Users');

router.get('/', function (req, res) {
    user.list(req, res);
});

router.get('/:id', function (req, res) {
    user.byId(req, res);
});

router.post('/', function (req, res) {
    user.create(req, res);
});

router.put('/:id', function (req, res) {
    user.update(req, res);
});

module.exports = router;