// using Express JS and mongoose to connect to MongoDB
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');
    var path = require('path')
    var index = require('./Server/index')
    var cors = require('cors')
    var expressJwt = require('express-jwt');

// mongoose instance connection url connection with todoDB 
mongoose.connect('mongodb://localhost:27017/entityDB', {
    useMongoClient: true
});
//require('./api/models/todo');
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(cors())

//View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')))

// Body Parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: "secret",
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate','/users/register','/entities'] }));

app.use('/', index)
//app.use('/api', tasks)
//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

//Initialize app from app.js
let initApp = require('./Server/app');
initApp(app);


// Actively listening to port 3000 
app.listen(port);
console.log('Entity RESTful-API server started on: ' + port);