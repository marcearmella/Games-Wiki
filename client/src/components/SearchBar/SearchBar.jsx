import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getVideogamesByName } from "../../redux/actions";

export default function SearchBar(){
    let dispatch = useDispatch();
    let [game, setGame] = useState('');

    let handleInputChange = e => {
        e.preventDefault();
        setGame(e.target.value);
    }

    let handleSubmit = e => {
        e.preventDefault();
        dispatch(getVideogamesByName(game));
    }

    return(
        <div>
            <input type='text' placeholder='Search games' onChange={e => handleInputChange(e)} />
            <button type="submit" onClick={e => handleSubmit(e)}>search</button>
        </div>
    );
}