const express = require('express');
const {registrarUsuario,listarUsuarios, verUsuario, borrarUsuarios, actualizarUsuario} = require('../db/db.js');
const app = express();
app.use(express.json());
app.set('port',3000);

const router = express.Router();

router.post('/registrar', registrarUsuario)
router.get('/listar',listarUsuarios)
router.get('/listar/:id', verUsuario)
router.delete('/borrar/:id', borrarUsuarios);
router.put('/actualizar/:id', actualizarUsuario)

router.post('/registrar', (req, res) =>{
    res.send('registrando');
})

module.exports = router;