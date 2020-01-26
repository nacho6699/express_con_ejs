const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/users');
//para dar acceso a la carpeta public
app.use(express.static('public'));
app.use(express.json());
app.set('port', 3000)

app.use('/users', userRouter);


app.listen(app.get('port'),()=>{
    console.log(`Running in port ${app.get('port')}`);
})
