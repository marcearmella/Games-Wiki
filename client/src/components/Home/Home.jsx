import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from '../Card';

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <Link to='/videogames'>Create Videogame</Link>
            <h1>Videogames</h1>
            <button onClick={e => {handleClick(e)}}>
                Reload games
            </button>
            <div>
                <p>by name</p>
                <select>
                    <option value='ascending'>asc</option>
                    <option value='descending'>des</option>
                </select>
                <p>by genre</p>
                <select>
                    <option value='action'>action</option>
                    <option value='adventure'>adventure</option>
                    <option value='strategy'>adventure</option>
                </select>
                <p>created</p>
                <select>
                    <option value='createdGames'>created</option>
                    <option value='allGames'>all games</option>
                    <option value='apiGames'>api</option>
                </select>
            </div>
            {
                allVideogames?.map(e => {
                    return(
                        <Card name={e.name} image={e.img} />
                    );
                })
            }
        </div>
    );

};