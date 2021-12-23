import types from '../actions/types';

const DEFAULT_STATE = {
    originalData: null,
    nameFilter: '',
    tags: null,
    tagExistsWarning: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){

        // Get data from api
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, originalData: action.payload.data.students};

        // Filter data by name    
        case types.SEARCH_BY_NAME:
            return {...state, nameFilter: action.payload, results: action.payload};  
            
        // Add a tag to a name. Check if tags exists for that name, make an array of objects, and add the tag to the tag array
        case types.ADD_TAG:
            const index = action.payload[0];
            const tag = action.payload[1];
            const tagObj = (ind, tg) => {
                const obj = {};
                obj.index = ind;
                obj.tags = [];
                obj.tags.push(tg);
                return obj;
            };

            // Clears out state.tagExistWarning object
            if (state.tagExistsWarning !== null) {
                state.tagExistsWarning = null;
            }
            
            if (state.tags === null) {
                state.tags = [];
                state.tags.push(tagObj(index, tag));
            } else {
                const tagIndex = state.tags.findIndex(element => element.index === index);
               if (tagIndex > -1) {
                    if (!state.tags[tagIndex].tags.includes(tag)) {
                        state.tags[tagIndex].tags.push(tag);
                    } else {
                        state.tagExistsWarning = [];
                        state.tagExistsWarning.push(index, "'" + tag + "' already does exists. Please enter a new tag.");
                    }      
                } else {
                    state.tags.push(tagObj(index, tag));
                }
            }
            return {...state, tagsList: state.tags, tagExistsWarning: state.tagExistsWarning};    
        default:
            return state;
    }
}
