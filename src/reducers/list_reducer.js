import types from '../actions/types';

const DEFAULT_STATE = {
    all: null,
    single: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_ALL_TO_DOS:
            return {...state, all: action.payload.data.todos};
        default:
            return state;
    }
}
