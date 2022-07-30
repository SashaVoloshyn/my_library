import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import css from './Layout.module.css';
import { useBlurMode } from '../../hooks';
import Header from "../Header/Header";
import AuthForm from "../Auth/AuthForm/AuthForm";
import RegistrationForm from "../Auth/RegistrationForm/RegistrationForm";
import {Footer} from "../Footer/Footer";

export const Layout = () => {
    const { triggerBlur } = useBlurMode();
    const [triggerRegBtn, setTriggerRegBtn] = useState(false);

    const handleRegistration = () => {
        triggerRegBtn ? setTriggerRegBtn(false) : setTriggerRegBtn(true);
    };

    return (
        <Box
            className={triggerBlur ? css.blur__bg : ''}
            sx={{
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header handleRegistration={handleRegistration} triggerRegBtn={triggerRegBtn} />
            { (triggerBlur && !triggerRegBtn) && <AuthForm handleRegistration={handleRegistration} /> }
            { (triggerBlur && triggerRegBtn) && <RegistrationForm handleRegistration={handleRegistration} /> }
            <main className={css.content}>
                <Outlet />
            </main>
            <Footer />
        </Box>
    );
};