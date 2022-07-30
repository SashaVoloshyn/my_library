import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import css from './RegistrationForm.module.css';

import {useBlurMode} from "../../../hooks";
import {
    errorAvatarFormatConstant,
    errorAvatarSizeConstant,
    fileMimetypeConstant, fileSizeConstant,
    fileTypeConstant
} from "../../../constants";
import {authRegistrationFormValidator} from "../../../utils";

const RegistrationForm = ({ handleRegistration }) => {
    const [avatarName, setAvatarName] = useState('');
    const [errorAvatar, setErrorAvatar] = useState('');
    const [visibilityChecked, setVisibilityChecked] = useState({ password: false, conformPassword: false });
    const { handleBlurToggle } = useBlurMode();

    const {
        register, watch, handleSubmit, formState: { errors },
    } = useForm(
        { resolver: joiResolver(authRegistrationFormValidator), mode: 'onTouched' }
    );

    const errorsMessagesValidators = errors;

    const submit = (data) => {
        const userOfForm = Object.assign(data);
        delete userOfForm.confirmPassword;
        if (!data?.avatar[0]) {
            delete userOfForm.avatar;
        }
    };

    const mimetype = fileMimetypeConstant[fileTypeConstant.PHOTOS].join();

    const handleVisibility = (e) => {
        if (e.currentTarget.id.includes('password')) {
            visibilityChecked.password ? setVisibilityChecked({ ...visibilityChecked, password: false })
                : setVisibilityChecked({ ...visibilityChecked, password: true });
        }

        if (e.currentTarget.id.includes('confirmPassword')) {
            visibilityChecked.conformPassword ? setVisibilityChecked({ ...visibilityChecked, conformPassword: false })
                : setVisibilityChecked({ ...visibilityChecked, conformPassword: true });
        }
    };

    watch((value) => {
        if (value.avatar[0]) {
            setAvatarName(value.avatar[0].name);

            if (fileSizeConstant.SIZE_AVATAR < value?.avatar[0]?.size
                || !fileMimetypeConstant[fileTypeConstant.PHOTOS].includes(value?.avatar[0]?.type)) {
                setErrorAvatar(`${errorAvatarFormatConstant()}, або ${errorAvatarSizeConstant()}`);
            } else {
                setErrorAvatar('');
            }
        }
    });

    const handleCloseRegistration = () => {
        handleBlurToggle();
        handleRegistration();
    };
    return (
        <div className={css.header__auth_registration}>
            <form className={css.header__auth_form_registration} onSubmit={handleSubmit(submit)}>
                <label htmlFor='nickName' className={css.header__auth_registration_form_label}>
                    Ваш псевдонім: { errors && (
                    <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.nickName?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('nickName') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type='text'
                        defaultValue=''
                        {...register('nickName')}
                    />
                    {
                        errors.nickName && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='email' className={css.header__auth_registration_form_label}>
                    Електронна пошта: { errors && (
                    <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.email?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('email') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                    {
                        errors.email && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='password' className={css.header__auth_registration_form_label}>
                    Пароль: { errors && (
                    <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.password?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('password') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type={!visibilityChecked.password ? 'password' : 'text'}
                        defaultValue=''
                        {...register('password')}
                    />
                    { !visibilityChecked.password
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__off_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__on_password_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )}
                    {
                        errors.password && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='confirmPassword' className={css.header__auth_registration_form_label}>
                    Підтвердіть пароль: { errors && (
                    <span className={css.header__auth_registration_form_span_error_message}>
                            { errorsMessagesValidators?.confirmPassword?.message }
                        </span>
                ) }
                    <input
                        className={
                            Object.keys(errors).includes('confirmPassword') ? css.header__auth_registration_form_label_input_error_bg
                                : css.header__auth_registration_form_label_input_bg
                        }
                        type={!visibilityChecked.conformPassword ? 'password' : 'text'}
                        defaultValue=''
                        {...register('confirmPassword')}
                    />
                    { !visibilityChecked.conformPassword
                        ? (
                            <VisibilityOffIcon
                                id={css.visibility__off_confirmPassword_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )
                        : (
                            <VisibilityIcon
                                id={css.visibility__on_confirmPassword_icon}
                                onClick={handleVisibility}
                                className={css.header__auth_registration_form_visibility_icon}
                            />
                        )}
                    {
                        errors.confirmPassword && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='avatar' className={css.header__auth_registration_form_label_avatar}>
                    Аватар: { avatarName ? <span>{avatarName}</span> : <span>не вибраний</span>}
                    <IconButton color='inherit' aria-label='upload picture' component='label'>
                        <input
                            className={
                                Object.keys(errors).includes('avatar') ? css.header__auth_registration_form_label_input_error_bg
                                    : css.header__auth_registration_form_label_input_bg
                            }
                            hidden
                            accept={mimetype}
                            type='file'
                            {...register('avatar')}
                        />
                        <PhotoCamera />
                    </IconButton>
                    { errorAvatar && (
                        <div>
                            <span className={css.header__auth_registration_form_span_error_message}>{ errorAvatar }</span>
                        </div>
                    ) }
                    { !avatarName && <span className={css.header__auth_registration_form_not_required}> (не обов`язково)</span> }
                    {
                        errors.avatar && (<WarningAmberIcon className={css.header__auth_registration_form_warning_amber_icon} />)
                    }
                </label>
                <Button
                    className={(Object.keys(errors).length || errorAvatar) ? css.header__auth_registration_form_btn_submit : ''}
                    type='submit'
                    variant='contained'
                    color='success'
                >
                    Зареєструватися
                </Button>
            </form>
            <CloseIcon className={css.header__auth_registration_form_close_icon} onClick={handleCloseRegistration} />
        </div>
    );
};

export default RegistrationForm;