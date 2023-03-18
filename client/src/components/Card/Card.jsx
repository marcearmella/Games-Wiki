import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({name, image, genres, id}){
    return(
        <NavLink style={{textDecoration: 'none'}} to={`/gamedetail/${id}`}>
            <div className={styles.card}>
                <h3>{name}</h3>
                <img src={image ? image : 'https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png' } alt={name} />
                <p>{ genres.join(', ') }</p>
                <button className={styles.button}>more</button>
            </div>
        </NavLink>
    );
};