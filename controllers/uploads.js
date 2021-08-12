const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { fstat } = require('fs');


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

//localhost:3000/api/upload/medicos/f129893b-6dfe-41a3-b51c-a0a43bc3403c.png
const retornaImagen = ( req, res ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    //imagen por defecto
    if ( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/noImage.jpeg` );
        res.sendFile( pathImg );
    }

    
}

module.exports = { fileUpload, retornaImagen }