import types from '../actions/types';

const DEFAULT_STATE = {
    all: null,
    single: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_LIST_OF_ALL_STUDENTS:
            console.log("students: ", action.payload.data.students);
            return {...state, all: action.payload.data.students};
        default:
            return state;
    }
}
