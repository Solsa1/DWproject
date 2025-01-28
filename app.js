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

async function UsuarioUpdate(id, email, senha, nome) {
    let user = await usuario.update({ email: email, senha: senha, nome: nome }, {where:{id:id }})
}

async function UsuarioDelete(id) {
    let user = await usuario.destroy({where:{id: id}});
}

async function UsuarioSelect(id) {
    let user = await usuario.findByPk(id);
    if (user == null){
        console.log('id errado pae');
    } else {
        console.log(user.dataValues);
    }
}

async function AutorInsert(nome, email, nome_art, genero, senha, gravadora) {
    let dono = await autor.create({
        nome:nome,
        email:email,
        nome_artistico: nome_art,
        genero_musical: genero, 
        senha: senha, 
        gravadora: gravadora
    })
}


async function AutorUpdate(id,nome, email, nome_art, genero, senha, gravadora ) {
    let dono = await autor.update({
        nome: nome,
        email:email,
        nome_artistico:nome_art,
        genero_musical: genero,
        senha:senha,
        gravadora:gravadora
    }, {where:{
        id:id
    }})    
}


async function AutorDelete(id) {
    let dono = await autor.destroy({where:{id:id}})
}



async function AutorSelect(id) {
    let dono = await autor.findByPk(id)
    if (dono == null){
        console.log('id errado pae')
    } else {
        console.log(dono.dataValues)
    }
}



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });