import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";

export default function Detail(props){

    let dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        dispatch( getDetail(id) )
    },[dispatch]);

    let videogame = useSelector( state => state.detail );


    return(
        <div>
            {                
                !videogame.length > 0 ?
                    <div>
                        <img src="https://thumbs.gfycat.com/HardPiercingEastrussiancoursinghounds-max-1mb.gif" alt="loading" />
                    </div>
                :
                    <div>
                        <Link to='/home'><button>back</button></Link>
                        <div>
                            <h1>{videogame[0].name}</h1>
                            <img src={videogame[0].img} width="200px" height="250px" />
                            <p>Description: {videogame[0].description?.replace(/<[^>]*>?/g, "")}.</p>
                            {videogame[0].rating > 1 ?
                                <p>Rating: {videogame[0].rating } stars.</p> :
                                <p>Rating: {videogame[0].rating} star.</p>
                            }
                            <p>Platforms: {videogame[0].platforms.join(', ')}.</p>
                            <p>Genres: {videogame[0].genres.join(', ')}.</p>
                            {videogame[0].released ? <p>Released date: {videogame[0].released}</p> : <p>Comming soon</p>}
                        </div>
                    </div>
            }
        </div>
    );
}