const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role goole');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });

}

const crearUsuario = async (req, res = response) => {
    
    const { email, password } = req.body;


    try{

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        
        await usuario.save();

        //Generar el token
        const token = await generarJWT ( usuario.id );
    
        res.json({
            ok: true,
            usuario,
            token
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado favor revisar los log.....'
        })
    }




}


const actualizarUsuario = async (req, res = response) => {

    //TODO: validar token y comprobar si el usuario es correcto


    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //actualizar
        const { password, google, email, ...campos } = req.body;
        
        if( usuarioDB.email != email ){
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email.'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findOneAndUpdate( uid, campos, { new:true } );


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async (req, res = response) => {



    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

       

        if( !usuarioDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findOneAndDelete( uid );

        res.json({
            ok: true,
            usuario: 'registro eliminado con éxito'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = { getUsuarios,crearUsuario, actualizarUsuario, borrarUsuario }