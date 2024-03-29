import React from "react";
import {NavLink} from 'react-router-dom';
import styles from './LandingPage.module.css';
import videox from '../../media/videobackground.mp4'

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <video src={videox} autoPlay loop muted />
            <div className={styles.otherCont}>
                <h1>Games-Wiki</h1>
                <div>
                    <NavLink to='/home'><button className={styles.button}>ENTER</button></NavLink>
                </div>
            </div>
        </div>
    )
}