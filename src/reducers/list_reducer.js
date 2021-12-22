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
            console.log("state: ", state);
            console.log("action: ", action.payload);
            const index = action.payload[0];
            const tag = action.payload[1];
            if (state.tags === null) {
                state.tags = [];
                const tagObj = {};
                tagObj.index = index;
                tagObj.tags = [];
                tagObj.tags.push(tag);
                state.tags.push(tagObj);
                console.log("state.tags: ", state.tags);
            } else {
                const indexExists = state.tags.some(element => element.index === index);
                if (indexExists) {
                    
                }
            }
            return {...state};    
        default:
            return state;
    }
}
