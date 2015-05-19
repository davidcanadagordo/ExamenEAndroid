// Incluímos las dependencias que vamos a usar
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    cors = require("cors"),
    mongoose = require("mongoose");

// Configuramos la app para que pueda realizar métodos REST
app.configure(function () {
    app.use(express.bodyParser()); // JSON parsing
    app.use(express.methodOverride()); // HTTP PUT and DELETE support
    app.use(app.router); // simple route management
    app.use(cors()); //cors para android
});


routes = require('./routes/users')(app);
routes2 = require('./routes/race')(app);


// Conexión BD
mongoose.connect('mongodb://localhost/examen', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});
app.use(express.static('angular'));
// petición GET del root que sólo muestre "Examen Mínimos EA David Cañada "
app.get('/', function(req, res) {
    res.send("Examen Mínimos EA David Cañada ");
});
app.get('/examen', function(req, res) {
    res.sendfile('./angular/index.html');});

// El servidor escucha en el puerto 5000
server.listen(5000, function() {
    console.log("Node server running on http://localhost:5000");
});