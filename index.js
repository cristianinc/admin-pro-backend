require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//crea el servidor 
const app = express();

//configuracion de cors
app.use( cors() );

dbConnection();


//rutas

app.get( '/', (req, res) => {

    
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});


app.listen( process.env.PORT, ()=> {
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT  );
});
