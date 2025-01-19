const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/database');
const usuario = require('./models/usuario.models');
const musicas = require('./models/musicas.models');
const autor = require('./models/autor.models');
const albuns = require('./models/albuns.models');


async function testeconect(){
    try{
        await db.authenticate();
        console.log('werisson é gay');
    }
    catch(error){
        console.error('werisson não é gay: ', error);
    }
}

testeconect();

async function sincronizacao(){
    try{
        await db.sync();
        console.log('deu certo pae');
    }
    catch(error){
        console.error('deu ruim pa carai', error);
    }
}

sincronizacao();

async function IsuarioInsert() {
    
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });