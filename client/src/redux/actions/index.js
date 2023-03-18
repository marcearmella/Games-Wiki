import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const DELETE_GAME = "DELETE_GAME";

export function getVideogames(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_ALL_VIDEOGAMES',
            payload: json.data
        });
    }
};

export const getGenres = () => dispatch => {
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

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
};

export function getVideogamesByName(game){
    return async function(dispatch){
        try{
            return fetch(`http://localhost:3001/videogames?name=${game}`)
            .then(response => response.json())
            .then(games => dispatch({ 
                type: "GET_VIDEOGAMES_BY_NAME",
                payload: games
            }));
        }catch(error){
            console.log(error);
        }
    }
};

export function createVideogame(payload){
    return async function(){
        let json = await axios.post('http://localhost:3001/videogames', payload);
        return json;
    }
};

export function getDetail(id){
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        }catch(err){
            console.log(err);
        }
    }
};

export function clearDetail(){
    return{
        type: "CLEAR_DETAIL"
    }
};

export function deleteGame(payload){
    return async function(){
        let json = await axios.delete(`http://localhost:3001/videogames/${payload}`);
        return json;
    }
};