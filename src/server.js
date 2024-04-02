const app = require('./app');
const sequelize = require('./utils/connection');
require('./models')

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        sequelize.sync();
        //sequelize.sync({force: true}); //Borra toda la base de datos.
        //sequelize.sync({alter: true}); //Permite modificaciones en la base de datos.
        console.log("DB connected");
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
