import types from '../actions/types';

const DEFAULT_STATE = {
    originalData: null,
    nameFilter: '',
    tagsList: null,
    tagExistsWarning: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){

        // Get data from api
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, originalData: action.payload.data.students};

        // Filter data by name    
        case types.SEARCH_BY_NAME:
            return {...state, nameFilter: action.payload};  
            
        // Add a tag to a name. Check if tags exists for that name, make an array of objects, and add the tag to the tag array
        case types.ADD_TAG:
            const id = action.payload[0];
            const tag = action.payload[1];
            const convertTagToArray = new Array(tag);
        
            if (state.tagExistsWarning !== null) {  /* Clears out state.tagExistWarning array */
                state.tagExistsWarning = null;
            }

            if (state.tagsList === null) {  /* For first index and tag */          
                const tagObj = Object.assign({}, {
                    id: id,
                    tags: convertTagToArray
                });
                const newTagsList = new Array(tagObj);
                return {...state, tagsList: newTagsList};

            } else {   /* For adding more tag */ 
                const objIndex = state.tagsList.findIndex(element => element.id === id);  
                if (objIndex > -1) {    /* Add new tag to object with found id */
                    if (state.tagsList[objIndex].tags.includes(tag)) { 
                        const warning = new Array(id, "'" + tag + "' already exists. Please enter a new tag.");
                        return {...state, tagExistsWarning: warning};
                    } else {
                        const newTagsArray = [...state.tagsList[objIndex].tags].concat(convertTagToArray);
                        const newTagObj = Object.assign({}, {
                            id: id,
                            tags: newTagsArray
                        });
                        const newTagsList = state.tagsList.slice(0, objIndex).concat(state.tagsList.slice(objIndex + 1));
                        const newTagsListWithNewTagArr = newTagsList.concat(newTagObj);
                        return {...state, tagsList: newTagsListWithNewTagArr};
                    }         
                } else {    /* Add new tag with new id */
                    const tagObj = Object.assign({}, {
                        id: id,
                        tags: convertTagToArray
                    });
                    const newTagsListWithNewIdObj = state.tagsList.concat(tagObj);
                    return {...state, tagsList: newTagsListWithNewIdObj};
                }
            }

        default:
            return state;
    }
}
