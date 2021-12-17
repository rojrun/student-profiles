import types from '../actions/types';

const DEFAULT_STATE = {
    all: null,
    single: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, all: action.payload.data.students};
        case types.SEARCH_BY_NAME:
            return {...state, all: action.payload};    
        default:
            return state;
    }
}
