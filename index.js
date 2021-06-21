require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//crea el servidor 
const app = express();

//configuracion de cors
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

dbConnection();


//rutas
app.use('/api/usuarios', require('./routes/usuarios') );


app.listen( process.env.PORT, ()=> {
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT  );
});
