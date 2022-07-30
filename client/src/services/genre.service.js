import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';


export const genreService = {
    getAll: () => axiosInstance.get(urls.genres).then(value => value.data.genres),
};