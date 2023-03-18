import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { getDetail, clearDetail, deleteGame } from "../../redux/actions";
import styles from './Detail.module.css';

export default function Detail(props){


    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteGame(id));
        history.push('/home');
    }

    useEffect(() => {
        dispatch( getDetail(id) );
        return () => {
            dispatch( clearDetail() );
        }
    },[]);

    let videogame = useSelector( state => state.detail );
    return(

        <div>
            {                
                !videogame.length > 0 ?
                    <img src="https://thumbs.gfycat.com/HardPiercingEastrussiancoursinghounds-max-1mb.gif" alt="loading" />
                :
                    <div className={styles.container}>
                        <button onClick={e => handleDelete(e)} className={styles.deleteBtn}>Borrar</button>
                        <Link to='/home'><button className={styles.button}>back to home</button></Link>
                        <div className={styles.detailContainer}>
                            <div className={styles.imgTextContainer}>
                                <img src={videogame[0].img ? videogame[0].img : 'https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png'} alt={videogame[0].name} />
                                <div className={styles.text}>
                                    <h1>{videogame[0].name}</h1>
                                    <p>{videogame[0].description?.replace(/<[^>]*>?/g, "")}.</p>
                                </div>
                            </div>
                            <div className={styles.features}>
                                {videogame[0].rating > 1 ?
                                    <div className={styles.rating}>
                                        <h2>Rating</h2>
                                        <p>{videogame[0].rating } stars</p>
                                    </div>
                                :
                                    <div className={styles.rating}>
                                        <h2>Rating</h2>
                                        <p>{videogame[0].rating } star</p>
                                    </div>
                                }
                                <div className={styles.platforms}>
                                    <h2>Platforms</h2>
                                    { !Array.isArray(videogame[0].platforms) ? <p>{videogame[0].platforms}</p> : <p>{videogame[0].platforms.join(', ')}</p> }
                                </div>
                                <div className={styles.genres}>
                                    <h2>Genres</h2>
                                    <p>{videogame[0].genres.join(', ')}</p>
                                </div>
                                {videogame[0].released ? 
                                    <div className={styles.released}>
                                        <h2>Released date</h2>
                                        <p>{videogame[0].released}</p>
                                    </div> 
                                : 
                                    <div className={styles.released}>
                                        <p>Comming soon</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}