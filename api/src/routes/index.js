const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const router = Router();
const {getAllVideogames, getGameDetail, getApiInfo} = require('./calls.js');
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
        gameName.length ? res.status(200).send(gameName) : res.status(404).send('No games found');
    }else{
        res.status(200).send(allVideogames);
    }
});

const createGame = async(name, description, released, rating, platforms, genres, img )=>{
    if(!name || !platforms || !description) throw new Error("Missing required parameters");

    let newGame = await Videogame.create({
        name, description, released, rating, platforms, genres, img
    });
    let genre = await Genres.findAll({
        where:{name: genres}
    });
    newGame.addGenres(genre);
    return newGame

};

router.post("/videogames", async(req,res)=>{
    const {name, description, released, rating, platforms, genres, img} = req.body;
    try {
        res.send(await createGame(name, description, released, rating, platforms, genres, img));
    }catch (error) {
        res.status(404).send(error);
    }
})

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

router.get('/videogames/:id', async(req, res) => {
    let id = req.params.id;
    let allVideogames = await getAllVideogames();

    let game = await allVideogames.filter(e => e.id == id);
    
    if(game[0].createdInDB){
        game.length ? res.status(200).json(game) : res.status(404).send('Game not found');
    }else{
        let apiGame = await getGameDetail(id);
        apiGame[0].id.toString().length ? res.status(200).json(apiGame) : res.status(404).send('Game not found');
    }
});

router.delete("/videogames/:id", async (req, res)=>{
    const {id} = req.params
    try {
       await Videogame.destroy({
            where:{
                id:id
            },
        include:{
            model:Genres,
            attributes:["name"]
        },
        through:{
            attributes:[]
        }
    })
    return res.status(200).send(id);
    } catch (error) {
        return res.status(200).send("Somenthing get wrong");
    }
})

module.exports = router;
