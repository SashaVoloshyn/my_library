import React from 'react';
import { Link } from 'react-router-dom';

import css from './Genre.module.css';

export const Genre= ({ genre: { name } }) => (
    <div className={css.header__nav_genres_typography}>
        <Link to={name}>
            <button className={css.header__nav_genre} type='button'>{name}</button>
        </Link>
    </div>
);



