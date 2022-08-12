import React from 'react';

export default function Card({name, image, genres, id}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image?image: 'https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png' } alt={name} width="200px" height="250px" />
            <p>{id.toString().length < 8 ? genres.join(', ') : genres.map(e => e.name + ' ')}</p>
        </div>
    );
};