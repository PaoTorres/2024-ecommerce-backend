// src/tests/testMigrate.js
const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

//require('../models')

const main = async() => {
   try{
       // Acciones a ejecutar antes de los tests
      sequelize.sync();

      const userTest = {
         firstName: "Test FirstName",
         lastName: "Test LastName",
         email: "test@test.com",
         password: "1234567890",
         phone: "3006831111",
      }
      await request(app).post('/users').send(userTest)

      process.exit();
    } catch(error){
       console.log(error);
      }
}

main();
//Instalar npm i jest supertest -D
//https://jestjs.io/docs/expect
//https://academlo.notion.site/Testing-ecfadf87241b4b8b82c56b956d567b92
//Lineas de json para el package.json, reemplazar comillas simples por dobles colocar al final de scripts
//'test': 'jest --detectOpenHandles',
//'migrate:reset': 'node ./src/tests/testMigrate.js',
//'pretest': 'npm run migrate:reset'