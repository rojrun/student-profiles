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

// export function addNewItem(item){
//     const resp = axios.post(BASE_URL + API_KEY, item);
//     return {
//         type: types.ADD_NEW_TO_DO,
//         payload: resp
//     }
// }

// export function getAllItems(){
//     const resp = axios.get(BASE_URL + API_KEY);
//     return{
//         type: types.GET_ALL_TO_DOS,
//         payload: resp
//     }
// }