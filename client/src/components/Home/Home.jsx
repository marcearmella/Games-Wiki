import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterGamesByGenre, getGenres, filterGamesByCreated, orderByName, orderByRating } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import Card from '../Card/Card';
import Paged from '../Paged/Paged';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector(state => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexLastGame = currentPage * gamesPerPage;
    const indexFirstGame = indexLastGame - gamesPerPage;
    const currentGames = allVideogames.slice(indexFirstGame,indexLastGame);
    const [order, setOrder] = useState('');

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch]);

    function handleReload(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getVideogames());
    };

    function handleFilterByGenre(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterGamesByGenre(e.target.value));
    };

    function handleFilterByCreated(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterGamesByCreated(e.target.value));
    };

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Orderer ${e.target.value}`);
    };

    function handleOrderByRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Orderer ${e.target.value}`);
    }

    return(
        <div>
            <div className={styles.navBar}>
                <div className={styles.logo}>
                    <h1>Videogames</h1>
                    <h2>wiki</h2>
                </div>
                <SearchBar />
                <div className={styles.selectsContainer}>
                    <div className={styles.orderSelect}>
                        <p>Order by</p>
                        <select defaultValue="byname" onChange={e => handleOrderByName(e)}>
                            <option disabled value="byname">Name</option>
                            <option value='ascending'>a-z</option>
                            <option value='descending'>z-a</option>
                        </select>
                        <select defaultValue="byrating" onChange={e => handleOrderByRating(e)}>
                            <option disabled value="byrating">Rating</option>
                            <option value='highest'>5-1</option>
                            <option value='lowest'>1-5</option>
                        </select>
                    </div>
                    <div className={styles.filterSelect}>
                        <p>Filter by</p>
                        <select defaultValue="bygenre" onChange={e => handleFilterByGenre(e)}>
                            <option disabled value="bygenre">Genre</option>
                            <option value='all'>all</option>
                            {allGenres?.map( e => {
                                return <option key={e.id} value={e.name}>{e.name}</option>
                            })}
                        </select>
                        <select defaultValue="bycreated" onChange={e => handleFilterByCreated(e)}>
                            <option disabled value="bycreated">Created / API</option>
                            <option value='all'>all games</option>
                            <option value='createdGames'>created</option>
                            <option value='apiGames'>api</option>
                        </select>
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <NavLink to='/videogameform' className={styles.createGames}><p>Create Videogame</p></NavLink>
                    <button onClick={e => {handleReload(e)}}>Reload games</button>
                </div>
            </div>
            <Paged gamesPerPage={gamesPerPage} allVideogames={allVideogames.length} paged={paged} />
            
            <div className={styles.cardsContainer}>
            {
                currentGames?.map(e => {
                    return(
                        <div key={e.id}>
                            <Card name={e.name} image={e.img} genres={e.genres} id={e.id} />
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};