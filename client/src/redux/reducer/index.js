import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_CREATED, ORDER_BY_NAME } from "../actions";

const initialState = {
    allVideogames: [],
    videogames: [],
    genres: []
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
            return{
                ...state,
                videogames: gamesFilteredByGenre
            }
        
        case FILTER_BY_CREATED:
            let allVideogames2 = state.allVideogames;
            let gamesFilteredByCreated = action.payload === 'createdGames' ? 
                                            allVideogames2.filter(e => e.createdInDB) :
                                            allVideogames2.filter(e => !e.createdInDB);
            return{
                ...state,
                videogames: action.payload === 'all' ? allVideogames2 : gamesFilteredByCreated
            }

        case ORDER_BY_NAME:
            let gamesInOrder = action.payload === 'ascending' ? 
                                state.videogames.sort(function(a,b){
                                    if(a.name > b.name) return 1;
                                    if(b.name > a.name) return -1;
                                    return 0;
                                }) :
                                state.videogames.sort(function(a,b){
                                    if(a.name > b.name) return -1;
                                    if(b.name > a.name) return 1;
                                    return 0;
                                })
            return{
                ...state,
                videogames: gamesInOrder
            }

        default: return state;
    }
};

export default rootReducer;