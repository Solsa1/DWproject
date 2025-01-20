const express = require('express');
const app = express();  
const port = 3000;
let path = "./config/database"; 
const sequelize = require(path);

const usuario = require('./models/usuario.models');
const musicas = require('./models/musicas.models');
const autor = require('./models/autor.models');
const albuns = require('./models/albuns.models');


async function testeconect(){
    try{
        await sequelize.authenticate();
        console.log('werisson é gay');
    }
    catch(error){
        console.error('werisson não é gay: ', error);
    }
}

testeconect();

async function sincronizacao(){
    try{
        await sequelize.sync();
        console.log('deu certo pae');
    }
    catch(error){
        console.error('deu ruim pa carai', error);
    }
}

sincronizacao();

async function UsuarioInsert() {
    aluno = Butar.sequelize.db("juao", "182.3")    
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });