import React from "react";
import styles from './Paged.module.css';
import loader from '../../media/loading.gif'

export default function Paged({gamesPerPage, allVideogames, currentPage, paged}){

    const pageNumber = [];

    for (let i=1; i<=Math.ceil(allVideogames/gamesPerPage);i++){
        pageNumber.push(i);
    }

    if(!allVideogames){
        return(
            <div>
                <img src={loader} className={styles.loader} alt="loading" />
            </div>
        )
    }else{
        return(
            <nav className={styles.container}>
                <ul className={styles.ul}>
                    {
                        pageNumber?.map( num => (
                            <li className={currentPage == num ? `${styles.li} ${styles.activeBtn}` : styles.li} key={num} >
                                <button onClick={() => paged(num)}>{num}</button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        );

    }
}