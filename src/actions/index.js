import axios from 'axios';
import types from './types';
import config from '../config';

const {BASE_URL} = config.api;

export function getAllStudents() {
    return {
        type: types.GET_LIST_OF_ALL_STUDENTS,
        payload: axios.get(BASE_URL)
    }
}

export function addRef(ref) {
    return {
        type: types.ADD_REF,
        payload: ref
    }
}

export function addNameFilterToState(input) {
    return {
        type: types.ADD_NAME_FILTER_TO_STATE,
        payload: input.target.value
    }
}

export function addTagFilterToState(input) {
    return {
        type: types.ADD_TAG_FILTER_TO_STATE,
        payload: input.target.value
    }
}

export function searchByFilters() {
    return {
        type: types.SEARCH_BY_FILTERS
    }
}

export function addTag(tag) {
    return {
        type: types.ADD_TAG,
        payload: tag
    };
}

export function addIdToIsOpen(id) {
    return {
        type: types.ADD_ID_TO_IS_OPEN,
        payload: id
    }
}

export function removeIdFromIsOpen(id) {
    return {
        type: types.REMOVE_ID_FROM_IS_OPEN,
        payload: id
    }
}
