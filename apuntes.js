const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
//setings
app.set('appName','mi primera app')
app.set('port', 3000)
app.set('view ingine', 'ejs')
//routes

//esto es un middelware ya que se ejecuta para cualquier tuta
app.use(function logger (req, res, next){
    console.log(`mostrando la uri : ${req.protocol} : // ${req.get('host')} ${req.originalUrl}`);
    console.log(app.get('appName'));
    next();
})
//usando morgan 
app.use(morgan('dev'));
//esta parte se aplicara siempre que se visite la ruta /insertar
app.all('/insertar/:id',(req, res, next)=>{
    console.log('por aqui siempre pasa...');
    
    next();
})
//------------para la base de datos
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:nacho@localhost:5432/bd_tareas");

//obteniendo desde postgress
app.get('/sql',(req,  res)=>{
    db.any("SELECT * FROM usuarios;")
    .then(rows =>{
        res.json(rows);
        console.log("DATA:", rows);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
    //res.send('llegoooooo');
})

// para renderizar el ejs
app.get('/',(req, res)=>{
    let data = [{nombre:'juan',edad:23},{nombre:'maria',edad:45},{nombre:'marce',edad:22},{nombre:'marce',edad:22}];
    res.render('index.ejs',{persona:data});
})
app.get ('/ayuda',(req, res)=>{
    res.json({
        nombre:'juan',
        edad:24
    });
})
app.post('/insertar/:id',(req, res)=>{
    res.send('peticion post');
    console.log(req.body);//recibiendo los datos json
    console.log(req.params);
})
app.put('/actualizar/:id',(req, res)=>{
    console.log(req.params);
    res.send('peticion put');

})
app.post('/borrar',(req, res)=>{
    res.send('peticion delete');
})


app.listen(app.get('port'),()=>{
    console.log(`Running in port ${app.get('port')}`);
})
//para dar acceso a la carpeta public
app.use(express.static('public'));