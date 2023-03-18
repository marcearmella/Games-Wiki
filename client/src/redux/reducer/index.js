import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, GET_VIDEOGAMES_BY_NAME, GET_DETAIL, CLEAR_DETAIL, DELETE_GAME } from "../actions";

const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    detail: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
                videogames: action.payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };

        case FILTER_BY_GENRE:
            let allVideogames = state.allVideogames;
            let gamesFilteredByGenre = action.payload === 'all' ? allVideogames : allVideogames.filter(e => e.genres.includes(action.payload));
            if(!gamesFilteredByGenre[0]) gamesFilteredByGenre = "error404"
            return{
                ...state,
                videogames: gamesFilteredByGenre
            }

        case FILTER_BY_CREATED:
            let allVideogames2 = state.allVideogames;
            let gamesFilteredByCreated = action.payload === 'createdGames' ? 
                                            allVideogames2.filter(e => e.createdInDB) :
                                            allVideogames2.filter(e => !e.createdInDB);
            if(!gamesFilteredByCreated[0]) gamesFilteredByCreated = "error404"
            return{
                ...state,
                videogames: action.payload === 'all' ? allVideogames2 : gamesFilteredByCreated
            }

        case ORDER_BY_NAME:
            let gamesInOrderByName = action.payload === 'ascending' ? 
                                state.videogames.sort(function(a,b){
                                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                                    if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                                    return 0;
                                }) :
                                state.videogames.sort(function(a,b){
                                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                                    if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                                    return 0;
                                })
            return{
                ...state,
                videogames: gamesInOrderByName
            }
        
        case ORDER_BY_RATING:
            let gamesInOrdeByRating = action.payload === 'lowest' ?
                                state.videogames.sort(function(a,b){
                                    if(a.rating > b.rating) return 1;
                                    if(b.rating > a.rating) return -1;
                                    return 0;
                                }) :
                                state.videogames.sort(function(a,b){
                                    if(a.rating > b.rating) return -1;
                                    if(b.rating > a.rating) return 1;
                                    return 0;
                                })
            return{
                ...state,
                videogames: gamesInOrdeByRating
            }
        
        case GET_VIDEOGAMES_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }

        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        
        case CLEAR_DETAIL:
            return{
                ...state,
                detail: []
            }

        default: return state;
    }
};

export default rootReducer;