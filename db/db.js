
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:nacho@localhost:5432/bd_tareas");

//todas estas mis funciones es como si estovieran ek el callback de users
const registrarUsuario = (req, res) =>{
    const {nombres,apellidos, correo} = req.body
    
    db.any(`INSERT INTO usuarios (nombres, apellidos, correo) VALUES ($1, $2, $3)`,[nombres,apellidos,correo])
    .then(
        res.send('Registrado!!!')
    )
    .catch(function (error) {
        console.log("ERROR:", error);
    });
}
const listarUsuarios = (req, res) =>{
    db.any("SELECT * FROM usuarios;")
    .then(rows =>{
        //console.log(req.params);
        //res.status(200).json(rows);
        res.render('usuarios.ejs', {usuarios:rows});
        
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
};
const verUsuario = (req, res) =>{
    const id = parseInt(req.params.id);
    db.any(`SELECT * FROM usuarios WHERE idU = $1`,[id])
    .then(rows => {
        res.status(200).json(rows);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
   
};
const borrarUsuarios = (req, res) =>{
    const id = parseInt(req.params.id);
    db.any(`DELETE FROM usuarios WHERE idU = $1`,[id])
    .then(
        res.send('Eliminado!!!')
    )
    .catch(error =>{
        console.log('ERROR: '+ error);
    })
};
const actualizarUsuario = (req, res) => {
    const id = parseInt(req.params.id);
    db.any(`UPDATE usuarios set nombres = $2, apellidos = $3 WHERE idU = $1`, [id,'juancito','pinto'])
    .then(
        res.send('Actualizado!!!')
    )
    .catch(error =>{
        console.log('ERROR '+console.error()
        )
    })
}

module.exports = {
    registrarUsuario,
    listarUsuarios,
    verUsuario,
    borrarUsuarios,
    actualizarUsuario
};