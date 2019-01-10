import axios from 'axios';
import types from './types';
import config from '../config';

const {API_KEY, BASE_URL} = config.api;

export function addNewItem(item){
    const resp = axios.post(BASE_URL + API_KEY, item);
    return {
        type: types.ADD_NEW_TO_DO,
        payload: resp
    }
}

export function getAllItems(){
    const resp = axios.get(BASE_URL + API_KEY);
    return{
        type: types.GET_ALL_TO_DOS,
        payload: resp
    }
}