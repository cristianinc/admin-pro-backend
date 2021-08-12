const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    

    if( !tiposValidos.includes(tipo) ){
        
        return  res.status(400).json({
                    ok: false,
                    msg: 'No es un medico, usuario u hospital'
                });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return  res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //procesar la imagen---

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes(extensionArchivo) ){
        return  res.status(400).json({
                    ok: false,
                    msg: 'La extensión del archivo no es válida'
                });
    }

    //genera nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path 
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //mover la imagen
    file.mv(path, (err) => {
        
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo );
        
        res.json({
            ok: true,
            msg: 'Archivo subido',
            archivo: nombreArchivo
        });
    });



}

module.exports = { fileUpload }