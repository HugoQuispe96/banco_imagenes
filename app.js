const express = require('express');
const morgan = require('morgan');
const path = require('path');
const createError = require("http-errors");
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const http = require('http');

//Middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//Declaración de rutas
const indexRouter = require("./routes/index");
//Redirect
app.use(function (req, res, next) {
  if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https') && (process.env.NODE_ENV == "Production")) {
    res.redirect(307, 'https://' + req.get('host') + req.url);
  } else {
    next();
  }
});

//Rutas
app.use("/", indexRouter);

//Rutas desconocidas
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  error = err.message;
  res.status(err.status || 500).json({ error });
});

//Despliegue
const puerto = process.env.PORT || 3000;
http.createServer(app).listen(puerto, function () {
  console.log('The server works in port: ' + puerto);
});