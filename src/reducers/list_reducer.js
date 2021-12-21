import types from '../actions/types';

const DEFAULT_STATE = {
    originalData: null,
    inputFilter: '',
    tags: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, originalData: action.payload.data.students};
        case types.SEARCH_BY_NAME:
            return {...state, inputFilter: action.payload, results: action.payload};    
        case types.ADD_TAG:
            console.log('reducer state: ', state);
            console.log("action: ", action);
            return {...state};    
        default:
            return state;
    }
}
