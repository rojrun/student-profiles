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

export function searchByName(text, array) {
    const value = text.target.value;
    console.log("value: ", value);
    console.log("array: ", array);
    // const copiedArray = array;
    // console.log("copiedArray: ", copiedArray);
    let filteredResults = array.filter(student => 
        student.firstName.toLowerCase().includes(value) || student.lastName.toLowerCase().includes(value)
    );
    console.log("filteredResults: ", filteredResults);
    
    // if (value) {
    //     let filteredResults = array.filter(student => 
    //         student.firstName.toLowerCase().includes(value) || student.lastName.toLowerCase().includes(value)
    //     );
    //     console.log("filteredResults: ", filteredResults);
    
    // } else {

    // }

    return {
        type: types.SEARCH_BY_NAME,
        payload: filteredResults
    }
}
