const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');



const getHospitales = async (req, res) => {

    
    

    res.json({
        ok: true,
        msg: 'getHospitales'
    });

}

const crearHospital = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'crearHospitales'
    });

}


const actualizarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar hospital'
    });
}


const borrarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar hospital'
    });

}

module.exports = { getHospitales, crearHospital, actualizarHospital, borrarHospital }