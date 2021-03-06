
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const  login =  async (req, res = response) => {

    const { email, password } = req.body;
    
    try{

        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Password no encontrado'
            });            
        }
        
        //Generar el token
        const token = await generarJWT ( usuarioDB.id );



        res.status(200).json({
            ok: true,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const  googleSignIn =  async (req, res = response) => {


    try {
        const { email, name, picture } = await googleVerify( req.body.token );
        res.status(200).json({
            ok: true,
            email, name, picture
        });

    } catch (error) {
        console.log('Error googleSign ', error);
        res.status(400).json({
            ok: true,
            msg: 'token de google no es correcto'
        });
    }


   



}

module.exports = {
    login,
    googleSignIn
}