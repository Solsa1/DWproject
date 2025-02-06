//Configuração basica do localhost
const express = require('express');
const app = express();  
const port = 3000; 

//Configuração do banco de dados
const sequelize = require('./database');
const usuario = require('./models/usuario');
const autor = require('./models/autor');
const musicas = require('./models/musicas');
const albuns = require('./models/albuns');

//Configuração do handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//Configuração do body-parser
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Configuração do CSS
app.use(express.static(__dirname + '/public'));

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
//Função de usuarios
async function UsuarioInsert(email, senha, nome) {
    let user = await usuario.create({
        email: email,
        senha: senha,
        nome: nome
    }) 
}

async function UsuarioUpdate(id, email, senha, nome) {
    let user = await usuario.update({ 
        email: email, 
        senha: senha, 
        nome: nome }, 
        {where:{id:id }})
}

async function UsuarioDelete(id) {
    let user = await usuario.destroy({where:{id: id}});
}

//Função de autores
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

async function AutorFindPKbyname(name) {
    let dono = await autor.findOne({
        where: {nome:name},
        attributes:['id'] 
    })
    return dono;
}

// Todas as rotas
app.get('/', (req, res) =>{
    res.render('index');
})

app.get('/autor', async (req, res) => {
    let autores = await autor.findAll()
    autores = autores.map((autor => autor.dataValues))
    res.render('autor', {autores});
})

app.post('/adicionarAutor', (req, res) => {
    let nome = req.body.NomeAutor;
    let email = req.body.EmailAutor;
    let nome_art = req.body.NomeArtisticoAutor;
    let gen = req.body.GeneroAutor;
    let senha = req.body.SenhaAutor;
    let grav = req.body.GravadoraAutor;

    AutorInsert(nome, email, nome_art, gen, senha, grav);
    res.redirect('/')
})

app.post('/updateAutor/:id', (req, res) =>{
    let identify = req.params.id;
    let nome = req.body.NovoNomeAutor;
    let email = req.body.NovoEmailAutor;
    let nome_art = req.body.NovoNomeArtisticoAutor;
    let gen = req.body.NovoGeneroAutor;
    let senha = req.body.NovoSenhaAutor;
    let grav = req.body.NovoGravadoraAutor;
    
    AutorUpdate(identify, nome, email, nome_art, gen, senha, grav);
    res.redirect('/')
})

app.get('/updateAutor/:id', async (req, res) =>{
    let autorr = await autor.findByPk(req.params.id);
    autorr = autorr.dataValues;
    res.render('updateAutor', {autorr})
})


app.get('/deleteAutor/:id', async (req, res) =>{
    AutorDelete(req.params.id);
    res.redirect('/');
})

app.get('/usuario', async (req, res) => {
    let usuarios = await usuario.findAll()
    usuarios = usuarios.map((usuario => usuario.dataValues))
    res.render('usuario', {usuarios});
})

app.post('/adicionarUsuario', (req, res) => {
    let nome = req.body.NomeUsuario;
    let email = req.body.EmailUsuario;
    let senha = req.body.SenhaUsuario;
    
    UsuarioInsert(email, senha, nome);
    res.redirect('/');
});

app.post('/updateUsuario/:id', (req, res) =>{
    let identify = req.params.id;

    let nome = req.body.NovoNomeUsuario;
    let email = req.body.NovoEmailUsuario;
    let senha = req.body.NovoSenhaUsuario;
   
    UsuarioUpdate(identify, email, senha, nome);
    res.redirect('/')
})

app.get('/updateUsuario/:id', async (req, res) =>{
    let user = await usuario.findByPk(req.params.id);
    user = user.dataValues;
    res.render('updateUsuario', {user})
})

app.get('/deleteUsuario/:id', async (req, res) =>{
    UsuarioDelete(req.params.id);
    res.redirect('/');
})

app.get('/album/:nome', async (req, res) =>{
    autor_dono = req.params.nome
    res.render('album', {autor_dono});
})

app.post('/album/:nome', async (req, res) => {
   let nomeAlbum = req.body.NomeAlbum;
   let idAutor =  await AutorFindPKbyname(req.params.nome)
   let album = await albuns.create({
    nome:nomeAlbum,
    id_autor:idAutor
   })
   res.redirect('/')
})

// Iniciando o server
sincronizacao();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });