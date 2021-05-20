const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));




const dbConnection = async () => {
    //zWaTCZss0Rhh3G94
    //mean_user
    //mongodb+srv://mean_user:*****@cluster0.rlyjz.gcp.mongodb.net/hospitaldb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log( 'Db onlinbe' );

    }catch( error ){
        console.log( error );
        throw new Error('Error al conectar con la database');
    }

}

module.exports = {
    dbConnection
}