import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card({name, image, genres, id}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image?image: 'https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png' } alt={name} width="200px" height="250px" />
            <p>{ genres.join(', ') }</p>
            <NavLink to={`/gamedetail/${id}`}><button>more</button></NavLink>
        </div>
    );
};