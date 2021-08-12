const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');


const getTodo = async (req, res = response) => {
    
    const busqueda = req.params.busqueda;

    try{

        const regex = new RegExp( busqueda, 'i' );

        const [ usuarios, hospitales, medicos ] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
            Medico.find({ nombre: regex })
        ]);

        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado favor revisar los log.....'
        })
    }
}

const getDocumentosColeccion = async (req, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;


    try{
        const regex = new RegExp( busqueda, 'i' );

        let data = [];

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
            case 'hospitales':
                data =  await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre img');
            break;
            case 'usuarios':
                data =  await Usuario.find({ nombre: regex });
            break;        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuario, medico, hospital'
                });

        }

        res.json({
            ok: true,
            resultados: data
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado favor revisar los log.....'
        })
    }
}

module.exports = { getTodo, getDocumentosColeccion }