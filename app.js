const express = require('express');
const app = express();  
const port = 3000; 
const sequelize = require('./database');

const usuario = require("./usuario");
const autor = require('./autor');
const musicas = require('./musicas');
const albuns = require('./albuns');


async function testeconect(){
    try{
        await sequelize.authenticate();
        console.log('werisson é gay');
    }
    catch(error){
        console.error('werisson não é gay: ', error);
    }
}


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

async function UsuarioInsert(email, senha, nome) {
    let user = await usuario.create({
        email: email,
        senha: senha,
        nome: nome
    })
    console.log(`usuario criado: ${user.id} - ${user.email} - ${user.senha} - ${user.nome} `)    
}

UsuarioInsert('jose@gmail.com', '123', 'jose')

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });