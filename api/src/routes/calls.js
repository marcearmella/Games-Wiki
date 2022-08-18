const axios = require('axios');
const {Videogame, Genres} = require('../db');
const { API_KEY } = process.env;
const baseURL = 'https://api.rawg.io/api/';

// const callApi = () => {
//     fetch(`${baseURL}games?key=${API_KEY}`)
//     .then((response) => response.json())
//     .then((json) => json.data.results.map(e => {
//         console.log(e.name);
//     }));
// };
// callApi()

const getApiInfo = async() => {
    let allApiInfo = [];
    for (let i=1; i<=5; i++) {
        let apiUrl = await axios.get(`${baseURL}games?key=${API_KEY}&page=${i}`);
        allApiInfo = [...allApiInfo, ...apiUrl.data.results];
    }
    const apiInfo = await allApiInfo.map(e => {
        return{
            id: e.id,
            name: e.name,
            img: e.background_image,
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    });
    return apiInfo;
};

const getDBInfo = async() => {
    let dbGames = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    let dbGamesModified = dbGames.map(e => {
        return{
            id: e.dataValues.id,
            name: e.dataValues.name,
            description: e.dataValues.description,
            released: e.dataValues.released,
            rating: e.dataValues.rating,
            platforms: e.dataValues.platforms,
            genres: e.dataValues.genres.map(e => e.name),
            createdInDB: e.dataValues.createdInDB
        }
    });
    
    return dbGamesModified;

};

const getAllVideogames = async() =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const allInfo = apiInfo.concat(dbInfo);
    
    return allInfo;
};

const getGameDetail = async(id) => {
    if (id.length < 8){
        let response = await axios.get(`${baseURL}games/${id}?key=${API_KEY}`);
        let videogame = [{
          name: response.data.name,
          id: response.data.id,
          description: response.data.description,
          img: response.data.background_image,
          released: response.data.released,
          rating: response.data.rating,
          genres: response.data.genres.map((g) => g.name),
          platforms: response.data.platforms.map((p) => p.platform.name),
        }];
        return videogame;
    }
};

module.exports = {getApiInfo, getAllVideogames, getGameDetail};