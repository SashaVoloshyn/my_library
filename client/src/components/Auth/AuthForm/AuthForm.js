import React, {  useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import css from './AuthForm.module.css';
import LoginForm from '../LoginForm/LoginForm';
import {useBlurMode} from "../../../hooks";

const AuthForm= ({ handleRegistration }) => {
    const { handleBlurToggle } = useBlurMode();

    return (
        <div className={css.header__auth_form}>
            <LoginForm />
            <Button
                onClick={handleRegistration}
                className={css.header__auth_form_btn}
                type='button'
                variant='contained'
                color='primary'
            >
                Зареєструватися
            </Button>
            <CloseIcon className={css.header__auth_form_close_icon} onClick={handleBlurToggle} />
        </div>
    );
};

export default AuthForm;