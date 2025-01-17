const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/database');


async function testeconect(){
    try{
        await db.authenticate();
        console.log('werisson é gay')
    }
    catch(error){
        console.error('werisson não é gay: ', error)
    }
}

testeconect();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });