import React, {
     useState,
} from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import css from './Genres.module.css';
import {Genre} from "../Ganre/Genre";
import {genreService} from "../../services";


export const Genres = () => {
    const [genres, setGenres] = useState([]);

    const getGenres = async () => {
        // if (!genres.length) {
        //     genreService.getAll().then(({ data }) => {
        //         setGenres(data);
        //         console.log(data);
        //     });
        // }
        if (!genres.length) {
            const { data } = await genreService.getAll();
            console.log(data);
            setGenres(data);
        }
    };

    return (
        <div className={css.header__nav_genres}>
            <PopupState variant='popover' popupId='genres-popup-popover'>
                {(popupState) => (
                    <div>
                        <Button onSubmit={getGenres} variant='text' color='inherit' {...bindTrigger(popupState)}>
                            Жанри
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorReference='anchorPosition'
                            anchorPosition={{ top: 90, left: 550 }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {
                                genres && genres.map((genre) => <Genre key={genre.id} genre={genre} />)
                            }
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    );
};
