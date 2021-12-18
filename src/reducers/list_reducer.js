import types from '../actions/types';

const DEFAULT_STATE = {
    originalData: null,
    inputFilter: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, originalData: action.payload.data.students};
        case types.SEARCH_BY_NAME:
            return {...state, inputFilter: action.payload};    
        default:
            return state;
    }
}
