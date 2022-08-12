import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {createVideogame, getGenres} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function VideogameForm(){
    let dispatch = useDispatch();
    let genres =  useSelector(state => state.genres);

    let availablePlatforms = [
        {id: 0, name: "PC"},
        {id: 1, name: "Playstation"},
        {id: 2, name: "Xbox"},
        {id: 3, name: "Nintendo Switch"}
    ];

    let[input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: []
    });

    useEffect(() => {
        dispatch(getGenres());
    },[]);

    return(
        <div>
            <Link to='/home'><button>back</button></Link>
            <h1>Upload a videogame</h1>
            <form>
                <div>
                  <label>Name *</label>
                  <input
                    type='text'
                    // value={input.name}
                    name='name'
                    // onChange={(e) => handleChange(e)}
                  ></input>
                </div>

                <div>
                  <label>Description *</label>
                  <input
                    type='text'
                    // value={input.description}
                    name='description'
                    // onChange={(e) => handleChange(e)}
                  ></input>

                  <label>Released Date *</label>
                  <input
                    type='text'
                    // value={input.released}
                    name='released'
                    placeholder='dd/mm/aaaa'
                    // onChange={(e) => handleChange(e)}
                  ></input>

                  <label>Rating *</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    // value={input.rating}
                    name='rating'
                    // onChange={(e) => handleChange(e)}
                   />

                  <label>Platforms</label>
                  {
                    availablePlatforms.map( e => <div><label>{e.name}</label><input type="checkbox" value={e.name} name="platforms" /> </div>)
                  }
                </div>
            </form>
        </div>
    );
}