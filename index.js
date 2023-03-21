// console.log("Hola Mundo");

// IMPORTANDO DEPENDENCIAS Y REFERENCIAS
require('dotenv').config();
const express = require('express');
var jwt = require('jsonwebtoken');
const md5 = require('md5');
const app = express();
require('./Config/db');

// Models
var User = require('./Models/Users');

// Routes Files
const users_routes = require('./Routes/Users');
const books_routes = require('./Routes/Books');
const categories_routes = require('./Routes/Categories');
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// KEY JWT VALIDATION
app.set('key', 'Abc123');
app.post('/auth', (req, res) => {
    console.log("Auth:", req.body);
    var email = req.body.email || '';
    var where = { email: email, password: md5(req.body.password) };
    User.findOne(where, (error, user) => {
        if (error) return res.status(500).send({ message: 'Authenticate error.' });
        if (!user) return res.status(403).send({ message: 'Authenticate error.' });

        const token = jwt.sign({ check: true }, app.get('key'), { expiresIn: "10h" });

        res.status(200).send({
            message: 'Auth succesfully',
            token: token,
            user: user,
        });
    });
});


const routeProtect = express.Router();
routeProtect.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {
                res.status(401).send({ message: 'Unauthorized access' });
            } else {
                res.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Unauthorized access' });
    }
});

app.listen(port, function () {
    console.log(`Example app listening on ${port}!`)
});


// API Route
app.use('/Users', users_routes);
app.use('/Books', routeProtect, books_routes);
app.use('/Categories', categories_routes);
