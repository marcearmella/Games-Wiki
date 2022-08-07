const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const getAllVideogames = require('./calls.js');
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

module.exports = router;
