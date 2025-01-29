//Configuração basica do localhost
const express = require('express');
const app = express();  
const port = 3000; 

//Configuração do banco de dados
const sequelize = require('./database');
const usuario = require('./usuario');
const autor = require('./autor');
const musicas = require('./musicas');
const albuns = require('./albuns');

//Configuração do handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//Configuração do body-parser
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Funções básicas
async function sincronizacao(){
    try{
        await sequelize.sync();
        console.log('deu certo pae');
    }
    catch(error){
        console.error('deu ruim pa carai', error);
    }
}



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

async function UsuarioFindPkbyLog(email, senha) {
    let identify = await usuario.findOne({atributes: ['id']}, {where: {email: email, senha:senha}})
    if (identify == null){
        console.log('deu errado lek')
    } else {
        return identify.id;
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
    let pessoa = await autor.findByPk(id)
    if (dono == null){
        console.log('id errado pae')
    } else {
        return pessoa
    }
}

async function AutorFindPkbyLog(email, senha) {
    let identify = await autor.findOne({atributes: ['id']}, {where: {email: email, senha:senha}})
    if (identify == null){
        console.log('deu errado lek')
    } else {
        return identify.id;
    }
}


// Todas as rotas
app.get('/crudautor', async (req, res) => {
    let autores = await autor.findAll()
    autores = autores.map((autor => autor.dataValues))
    res.render('crudautor', {autores});
})

app.post('/adicionarAutor', (req, res) => {
    let nome = req.body.NomeAutor;
    let email = req.body.EmailAutor;
    let nome_art = req.body.NomeArtisticoAutor;
    let gen = req.body.GeneroAutor;
    let senha = req.body.SenhaAutor;
    let grav = req.body.GravadoraAutor;

    AutorInsert(nome, email, nome_art, gen, senha, grav);
    res.send('deu tudo certo');
    //res.render('/')
})

app.post('/atualizarAutor', async (req, res) => {
    let antigoEmail = req.body.AntigoEmail;
    let antigaSenha = req.body.AntigaSenha;
    let identify = await AutorFindPkbyLog(antigoEmail, antigaSenha);

    let nome = req.body.NovoNomeAutor;
    let email = req.body.NovoEmailAutor;
    let nome_art = req.body.NovoNomeArtisticoAutor;
    let gen = req.body.NovoGeneroAutor;
    let senha = req.body.NovoSenhaAutor;
    let grav = req.body.NovoGravadoraAutor;
    
    AutorUpdate(identify, nome, email, nome_art, gen, senha, grav);
    res.send('tudo legal');})


app.post('/deletarAutor', async (req, res) =>{
    let email = req.body.emailDeletado;
    let senha = req.body.senhaDeletada;
    let identify = await AutorFindPkbyLog(email, senha);

    AutorDelete(identify);
    res.send('banido');
})

app.get('/crudusuario', async (req, res) => {
    let usuarios = await usuario.findAll()
    usuarios = usuarios.map((usuario => usuario.dataValues))
    res.render('crudusuario', {usuarios});
})

app.post('/adicionarUsuario', (req, res) => {
    let nome = req.body.NomeUsuario;
    let email = req.body.EmailUsuario;
    let senha = req.body.SenhaUsuario;
    
    UsuarioInsert(nome, email, senha);
    res.send('deu tudo certo');
    //res.render('/')
})

app.post('/atualizarUsuario', async (req, res) => {
    let antigoEmail = req.body.AntigoEmail;
    let antigaSenha = req.body.AntigaSenha;
    let identify = await UsuarioFindPkbyLog(antigoEmail, antigaSenha);

    let nome = req.body.NomeUsuario;
    let email = req.body.EmailUsuario;
    let senha = req.body.SenhaUsuario;
   
    UsuarioUpdate(identify, nome, email, senha);
    res.send('tudo legal');})


app.post('/deletarAutor', async (req, res) =>{
    let email = req.body.emailDeletado;
    let senha = req.body.senhaDeletada;
    let identify = await UsuarioFindPkbyLog(email, senha);

    UsuarioDelete(identify);
    res.send('banido');
})


// Iniciando o server
sincronizacao();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });