import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound404(){
    return(
        <div>
           <h1>404 PAGE NOT FOUND</h1>
           <Link to={"/home"}><button>Back to home</button></Link>
        </div>
    )
}