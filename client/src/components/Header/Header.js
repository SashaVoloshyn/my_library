import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import css from './Header.module.css';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Nav from './Nav/Nav';
import ToggleColorMode from './ToggleColorMode/ToggleColorMode';
import Auth from "../Auth/Auth";

const Header = ({ handleRegistration, triggerRegBtn }) => {
    const theme = useTheme();

    const [themeMode, setThemeMode] = useState(`${css.header}`);

    useEffect(() => {
        theme.palette.mode === 'dark' ? setThemeMode(`${css.header__dark}`) : setThemeMode(`${css.header}`);
    }, [theme.palette.mode]);

    return (
        <header className={themeMode}>
            <div className={css.header__container}>
                <Logo />
                <div className={css.header__container_nav}>
                    <Search />
                    <Nav />
                </div>
                <Auth handleRegistration={handleRegistration} triggerRegBtn={triggerRegBtn} />
                <ToggleColorMode />
            </div>
        </header>
    );
};

export default Header;