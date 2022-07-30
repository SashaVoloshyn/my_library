import React, {  useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

import css from './Search.module.css';

const Search = () => {
    const theme = useTheme();
    const [dark, setDark] = useState('');

    useEffect(() => {
        theme.palette.mode === 'dark' ? setDark(css.header__form_search_form_dark) : setDark('');
    }, [theme.palette.mode]);
    return (
        <div className={css.header__form_search}>
            <div className={css.header__form_icon}>
                <SearchIcon fontSize='small' />
            </div>
            <form className={dark || css.header__form_search_form}>
                <input type='text' placeholder='Пошук' />
            </form>
        </div>
    );
};

export default Search;