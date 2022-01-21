import types from '../actions/types';

const DEFAULT_STATE = {
    originalData: null,
    nameFilter: '',
    tagsList: null,
    tagExistsWarning: null,
    tagFilter: '', 
    isNameFilterFirst: false,
    results: null, 
    isOpen: [],
    ref: null
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){

        // Get data from api
        case types.GET_LIST_OF_ALL_STUDENTS:
            return {...state, originalData: action.payload.data.students, results: action.payload.data.students};

        // Add ref from list component
        case types.ADD_REF:
            return {...state, ref: action.payload};
        
        // Add name filter to state
        case types.ADD_NAME_FILTER_TO_STATE:
            return {...state, nameFilter: action.payload};

        // Add tag filter to state
        case types.ADD_TAG_FILTER_TO_STATE:
            return {...state, tagFilter: action.payload};    
        
        // Filter data by name or tag   
        case types.SEARCH_BY_FILTERS:
            let isNameFilterFirst = false;
            let results;
            const nameFilter = (array) => {
                return array.filter(student => 
                    student.firstName.toLowerCase().includes(state.nameFilter) || student.lastName.toLowerCase().includes(state.nameFilter)
                );
            };
            const tagFilter = (array) => {
                if (state.tagsList) {
                    const filtered = state.tagsList.filter(obj => !!obj.tags.find(t => t.includes(state.tagFilter)));
                    return array.filter(student => {
                        return filtered.some(obj => {
                            return student.id === obj.id;
                        });
                    });
                } else {
                    return [];
                }
            };

            // Search by name only
            if (state.nameFilter && !state.tagFilter) {
                results = nameFilter(state.originalData);
                isNameFilterFirst = true;
                return {...state, isNameFilterFirst: isNameFilterFirst, results: results}; 
            }

            // Search by tag only
            if (!state.nameFilter && state.tagFilter) {
                results = tagFilter(state.originalData);
                return {...state, results: results};
            }

            // Search with both name and tag filters
            if (state.nameFilter && state.tagFilter) {
                if (state.isNameFilterFirst) {
                    results = tagFilter(state.results);
                } else {
                    results = nameFilter(state.results);
                    }
                return {...state, results: results};
            }

            // Both tags are empty
            if (!state.nameFilter && !state.tagFilter) {
                results = state.originalData;
                isNameFilterFirst = false;
                return {...state, isNameFilterFirst: isNameFilterFirst, results: results};  
            }
            
        // Add a tag to a name. Check if tags exists for that name, make an array of objects, and add the tag to the tag array
        case types.ADD_TAG:
            // const id = action.payload[0];
            // const tag = action.payload[1];
            // const convertTagToArray = new Array(tag);
        
            // if (state.tagExistsWarning !== null) {  /* Clears out state.tagExistWarning array */
            //     state.tagExistsWarning = null;
            // }

            // if (state.tagsList === null) {  /* For first index and tag */          
            //     const tagObj = Object.assign({}, {
            //         id: id,
            //         tags: convertTagToArray
            //     });
            //     const newTagsList = new Array(tagObj);
            //     return {...state, tagsList: newTagsList};

            // } else {   /* For adding more tag */ 
            //     const objIndex = state.tagsList.findIndex(element => element.id === id);  
            //     if (objIndex > -1) {    /* Add new tag to object with found id */
            //         if (state.tagsList[objIndex].tags.includes(tag)) { 
            //             const warning = new Array(id, "'" + tag + "' already exists. Please enter a new tag.");
            //             return {...state, tagExistsWarning: warning};
            //         } else {
            //             const newTagsArray = [...state.tagsList[objIndex].tags].concat(convertTagToArray);
            //             const newTagObj = Object.assign({}, {
            //                 id: id,
            //                 tags: newTagsArray
            //             });
            //             const newTagsList = state.tagsList.slice(0, objIndex).concat(state.tagsList.slice(objIndex + 1));
            //             const newTagsListWithNewTagArr = newTagsList.concat(newTagObj);
            //             return {...state, tagsList: newTagsListWithNewTagArr};
            //         }         
            //     } else {    /* Add new tag with new id */
            //         const tagObj = Object.assign({}, {
            //             id: id,
            //             tags: convertTagToArray
            //         });
            //         const newTagsListWithNewIdObj = state.tagsList.concat(tagObj);
            //         return {...state, tagsList: newTagsListWithNewIdObj};
            //     }
            // }

            // console.log("action.payload: ", action.payload);
            for (const prop in action.payload) {
                if (action.payload.hasOwnProperty(prop)) {
                    const id = prop.slice(6);
                    const tag = action.payload[prop];
                    const convertTagToArray = new Array(tag);
                    // console.log("id: ", id);
                    // console.log("convertTagToArray: ", convertTagToArray);

                    if (state.tagsList === null) {  /* For first id and tag */          
                        const tagObj = Object.assign({}, {
                            id: id,
                            tags: convertTagToArray
                        });
                        const newTagsList = new Array(tagObj);
                        return {...state, tagsList: newTagsList};
        
                    } else {   /* For adding more tag */ 
                        const objIndex = state.tagsList.findIndex(element => element.id === id);  
                        if (objIndex > -1) {    /* Add new tag to object with found id */
                            // if (state.tagsList[objIndex].tags.includes(tag)) { 
                            //     const warning = new Array(id, "'" + tag + "' already exists. Please enter a new tag.");
                            //     return {...state, tagExistsWarning: warning};
                            // } else {
                                const newTagsArray = [...state.tagsList[objIndex].tags].concat(convertTagToArray);
                                const newTagObj = Object.assign({}, {
                                    id: id,
                                    tags: newTagsArray
                                });
                                const newTagsList = state.tagsList.slice(0, objIndex).concat(state.tagsList.slice(objIndex + 1));
                                const newTagsListWithNewTagArr = newTagsList.concat(newTagObj);
                                return {...state, tagsList: newTagsListWithNewTagArr};
                            // }         
                        } else {    /* Add new tag with new id */
                            const tagObj = Object.assign({}, {
                                id: id,
                                tags: convertTagToArray
                            });
                            const newTagsListWithNewIdObj = state.tagsList.concat(tagObj);
                            return {...state, tagsList: newTagsListWithNewIdObj};
                        }
                    }
                }
            }
            

        // Add id to isOpen
        case types.ADD_ID_TO_IS_OPEN:
            const convertIdToArray = new Array(action.payload);
            const newIsOpen = state.isOpen.concat(convertIdToArray);
            return {...state, isOpen: newIsOpen};

        // Remove id from isOpen
        case types.REMOVE_ID_FROM_IS_OPEN:
            const isOpenCopy = [...state.isOpen];
            const idIndex = isOpenCopy.indexOf(action.payload);
            if (idIndex > -1) {
                isOpenCopy.splice(idIndex, 1);
                return {...state, isOpen: isOpenCopy};
            }   

        default:
            return state;
    }
}
