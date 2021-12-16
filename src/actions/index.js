import axios from 'axios';
import types from './types';
import config from '../config';

const {BASE_URL} = config.api;

export function getAllStudents() {
    const resp = axios.get(BASE_URL);
    return {
        type: types.GET_LIST_OF_ALL_STUDENTS,
        payload: resp
    }
}

export function searchByName(text) {
    const resp = axios.get(BASE_URL);
    

    return {
        type: types.SEARCH_BY_NAME,
        payload: resp
    }
}
