require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

//crea el servidor 
const app = express();

//configuracion de cors
app.use( cors() );


//carpet PUBLICA

app.use( express.static('public') )

//Lectura y parseo del body
app.use( express.json() );

//dbConnection();


//rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/login', require('./routes/auth') );

app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/upload', require('./routes/uploads') );


app.listen( process.env.PORT, ()=> {
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT  );
});
