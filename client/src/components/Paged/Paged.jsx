import React from "react";
import style from './Paged.module.css';

export default function Paged({gamesPerPage, allVideogames, paged}){

    const pageNumber = [];

    for (let i=1; i<=Math.ceil(allVideogames/gamesPerPage);i++){
        pageNumber.push(i);
    }

    if(!allVideogames){
        return(
            <div>
                <img src="https://thumbs.gfycat.com/HardPiercingEastrussiancoursinghounds-max-1mb.gif" alt="loading" />
            </div>
        ) 
    }else{
    
        return(
            <nav>
                <ul className={style.paged_ul}>
                    {
                        pageNumber?.map( num => (
                            <li className={style.paged_li} key={num}>
                                <button onClick={() => paged(num)}>{num}</button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        );

    }
}