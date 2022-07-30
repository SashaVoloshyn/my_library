import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';

import css from './LoginForm.module.css';
import {authLoginFormValidator} from "../../../utils";

const LoginForm = () => {
    const [visibilityChecked, setVisibilityChecked] = useState(false);

    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: joiResolver(authLoginFormValidator), mode: 'onTouched',
    });

    const submit = (data) => {
        console.log(data);
    };

    const handleVisibility = () => {
        visibilityChecked ? setVisibilityChecked(false)
            : setVisibilityChecked(true);
    };

    return (
        <div className={css.header__auth_login}>
            <form className={css.header__auth__login_form} onSubmit={handleSubmit(submit)}>
                <label htmlFor='email' className={css.header__auth_login_form_label}>
                    Електронна пошта: { errors && (
                    <span className={css.header__auth_login_form_span_error_message}>
                            { errors?.email?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('email') ? css.header__auth_login_form_label_input_error_bg
                                : css.header__auth_login_form_label_input_bg
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                    {
                        errors.email && (<WarningAmberIcon className={css.header__auth_login_form_warning_amber_icon} />)
                    }
                </label>
                <label htmlFor='password' className={css.header__auth_login_form_label}>
                    Пароль: { errors && (
                    <span className={css.header__auth_login_form_span_error_message}>
                            { errors?.password?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('password') ? css.header__auth_login_form_label_input_error_bg
                                : css.header__auth_login_form_label_input_bg
                        }
                        type={!visibilityChecked ? 'password' : 'text'}
                        defaultValue=''
                        {...register('password')}
                    />
                    { !visibilityChecked
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__on_login_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_login_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__off_login_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_login_form_visibility_icon}
                            />
                        )}
                    {
                        errors.password && (<WarningAmberIcon className={css.header__auth_login_form_warning_amber_icon} />)
                    }
                </label>
                <Button
                    className={(Object.keys(errors).length) ? css.header__auth_login_form_btn_submit : ''}
                    type='submit'
                    variant='contained'
                    color='success'
                >
                    Увійти
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;