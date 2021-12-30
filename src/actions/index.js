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

export function searchByFilter(filter) {
    return {
        type: types.SEARCH_BY_FILTER,
        payload: filter
    }
}

export function addTag(id, tag) {
    const idAndTag = new Array(id, tag);
    return {
        type: types.ADD_TAG,
        payload: idAndTag
    }
}
