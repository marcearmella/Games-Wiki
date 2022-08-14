const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const router = Router();
const {getAllVideogames, getApiInfo} = require('./calls.js');
const {Genres, Videogame} = require('../db');

const { API_KEY } = process.env;
const baseURL = 'https://api.rawg.io/api/';
//const Videogame = require('../models/Videogame.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async(req, res) => {
    const name = req.query.name;
    let allVideogames = await getAllVideogames();
    if(name){
        let gameName = await allVideogames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length ? res.status(200).send(gameName) : res.status(404).send('No se encuentra el juego');
    }else{
        res.status(200).send(allVideogames);
    }
});

router.get('/videogames/:id', async(req, res) => {
    let id = req.params.id;
    let allVideogames = await getAllVideogames();
    if(id){
        let gameId = await allVideogames.filter(e => e.id == id);
        gameId.length ? res.status(200).json(gameId) : res.status(404).send('No se encontró el personaje');
    }
});

const createGame = async(name, description, released, rating, platforms, genres )=>{
    if(!name || !platforms || !description) throw new Error("Missing required parameters")

    let newGame = await Videogame.create({
        name, description, released, rating, platforms, genres
     });

    let genre = await Genres.findAll({
            where:{name: genres}
    });

    newGame.addGenres(genre);
    return newGame

};

router.post("/videogames", async(req,res)=>{
    const {name, description, released, rating, platforms, genres} = req.body;
    try {
        res.send(await createGame(name, description, released, rating, platforms, genres));
    } catch (error) {
        res.status(404).send(error)
    }
})
        
// router.post('/videogames', async(req, res) => {
//     let {
//         name,
//         description,
//         released,
//         rating,
//         platforms,
//         genres,
//         createdInDB
//     } = req.body;
    
//     if (!name || !platforms || !description) {
//         throw new Error("Name, platform or description missing.");
//     }
    
//     let videogameCreated = await Videogame.create({
//         name,
//         description,
//         released,
//         rating,
//         platforms,
//         createdInDB
//     })

//     let genresDb = await Genres.findAll({
//         where: {name : genres}
//     })

//     videogameCreated.addGenres(genresDb);
//     res.send('Videogame created.');
// });

router.get('/genres', async(req, res) => {

    const genresUrl = await axios.get(`${baseURL}genres?key=${API_KEY}`);
    let genresData = await genresUrl.data;
    let genres = genresData.results.map(e => {
        return {
            name: e.name
        };
    });
    
    for (let i=0; i<genres.length; i++) {
        await Genres.findOrCreate({
            where: { name: genres[i].name }
        });
    }
    const allGenres = await Genres.findAll();
    res.send(allGenres);

});


module.exports = router;
