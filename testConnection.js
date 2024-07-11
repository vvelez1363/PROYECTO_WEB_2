const sequelize = require('./db/sequelize');

sequelize.authenticate()
    .then(() => {
        console.log('La conexión a la base de datos ha sido exitosa.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    })
    .finally(() => {
        sequelize.close();
    });