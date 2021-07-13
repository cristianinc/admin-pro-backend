const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getMedicos = async (req, res) => {


    res.json({
        ok: true,
        msg: 'getMedicos'
    });

}

const crearMedico = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'crearMedicos'
    });

}


const actualizarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar medico'
    });
}


const borrarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar medico'
    });

}

module.exports = { getMedicos, crearMedico, actualizarMedico, borrarMedico }