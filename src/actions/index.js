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
    const value = text.target.value;
    return {
        type: types.SEARCH_BY_NAME,
        payload: value
    }
}

export function addTag(index, tag) {
    const indexAndTag = [];
    indexAndTag.push(index, tag);
    return {
        type: types.ADD_TAG,
        payload: indexAndTag
    }
}
