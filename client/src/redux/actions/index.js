import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_ALL_VIDEOGAMES',
            payload: json.data
        });
    }
}

export const getGenres = () => (dispatch) => {
    return fetch('http://localhost:3001/genres')
        .then(r => r.json())
        .then(genres => {
            dispatch({
                type: 'GET_GENRES',
                payload: genres
            });
        });
};

export function filterGamesByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    };
};

export function filterGamesByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED',
        payload
    };
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    };
};