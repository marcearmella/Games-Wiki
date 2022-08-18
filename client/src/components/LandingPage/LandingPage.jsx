import React from "react";
import {NavLink} from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <h1>Videogames wiki</h1>
            <div>
                <h2>click to load the games</h2>
                <NavLink to='/home'><button className={styles.button}>ENTER</button></NavLink>
            </div>
        </div>
    )
}