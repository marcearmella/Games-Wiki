import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {createVideogame, getGenres} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import styles from './VideogameForm.module.css';

export default function VideogameForm(){
    let dispatch = useDispatch();
    let genres =  useSelector(state => state.genres);
    let history = useHistory();
    let [errors, setErrors] = useState("");

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch]);

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
        rating: 1,
        platforms: [],
        genres: []
    });

    let handleChange = e => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    let handleCheckbox = e => {
        if(e.target.checked){
            e.target.name === 'platforms' ?
            setInput({
                ...input,
                platforms : [...input.platforms , e.target.value]
            }) :
            setInput({
                ...input,
                genres : [...input.genres , e.target.value]
            })
        }
    }

    let validateForm = () => {
        if(!input.name){
            setErrors("Name is missing");
            return false;
        }
        if(input.name.length > 60){
            setErrors("The maximum characters for name is 60");
            return false;
        }
        if( !/^[a-zA-Z\s]*$/.test(input.name) ){
            setErrors("Invalid name");
            return false;
        }
        if(!input.description){
            setErrors("Description is required");
            return false;
        }
        if(!input.platforms.length){
            setErrors("At least one platform required");
            return false;
        }
        if(!input.genres.length){
            setErrors("At least one genre required");
            return false;
        }
        return true;
    }
    
    let handleSubmit = e => {
        e.preventDefault();
        let validated = validateForm();
        if(validated){
            dispatch(createVideogame(input));
            setInput({
                name: '',
                description: '',
                released: '',
                rating: 0,
                platforms: [],
                genres: []
            })
            alert("successful");
            history.push('/home');
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Upload a videogame</h1>
                <Link to='/home'><button>back</button></Link>
            </div>
            <div className={styles.container}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label>Name *</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={(e) => handleChange(e)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Description *</label>
                        <input
                            type='text'
                            value={input.description}
                            name='description'
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Released Date</label>
                        <input
                            type='date'
                            value={input.released}
                            name='released'
                            placeholder='dd/mm/aaaa'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Rating</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={input.rating}
                            name='rating'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={styles.checkbox}>
                        <p>Platforms</p>
                        <div>
                            {availablePlatforms.map( e => 
                            <label key={e.id}>
                                {e.name}
                                <input type="checkbox" value={e.name} name="platforms" onChange={(e) => handleCheckbox(e)} />
                            </label>)}
                        </div>
                    </div>
                    <div className={styles.checkbox}>
                        <p>Genres</p>
                        <div>
                            {genres.map( e => 
                            <label key={e.id}>
                                {e.name}
                                <input type="checkbox" value={e.name} name="genres" onChange={(e) => handleCheckbox(e)} />
                            </label>)}
                        </div>
                    </div>
                    { errors ? <span>{errors}</span> : null }
                    <button disabled={!input.name || !input.description || !input.platforms || !input.genres} type="submit">SEND</button>
                </form>
            </div>
        </div>
    );
}