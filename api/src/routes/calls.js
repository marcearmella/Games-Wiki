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
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    });
    return apiInfo;
};

const getDBInfo = async() => {
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};

const getAllVideogames = async() =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const allInfo = apiInfo.concat(dbInfo);
    
    return allInfo;
};

module.exports = {getApiInfo, getAllVideogames};