import React from "react";
import style from './Paged.module.css';

export default function Paged({gamesPerPage, allVideogames, paged}){

    const pageNumber = [];

    for (let i=1; i<=Math.ceil(allVideogames/gamesPerPage);i++){
        pageNumber.push(i);
    }

    return(
        <nav>
            <ul className={style.paged_ul}>
                {
                    pageNumber?.map( num => (
                        <li className={style.paged_li} key={num}>
                            <a onClick={() => paged(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );

}