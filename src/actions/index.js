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

export function addRef(ref) {
    return {
        type: types.ADD_REF,
        payload: ref
    }
}

export function addNameFilterToState(input) {
    const filter = input.target.value;
    return {
        type: types.ADD_NAME_FILTER_TO_STATE,
        payload: filter
    }
}

export function addTagFilterToState(input) {
    const filter = input.target.value;
    return {
        type: types.ADD_TAG_FILTER_TO_STATE,
        payload: filter
    }
}

export function searchByFilters() {
    return {
        type: types.SEARCH_BY_FILTERS
    }
}

// export function addTag(id, tag) {
//     const idAndTag = new Array(id, tag);
//     return {
//         type: types.ADD_TAG,
//         payload: idAndTag
//     }
// }
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
