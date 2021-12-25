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
            return {...state, nameFilter: action.payload, results: action.payload};  
            
        // Add a tag to a name. Check if tags exists for that name, make an array of objects, and add the tag to the tag array
        case types.ADD_TAG:
            console.log("tagsList: ", state.tagsList);
            const index = action.payload[0];
            const tag = action.payload[1];
            
            if (state.tagsList === null) {  /* For first index and tag */    
                const convertTagToArray = new Array(tag);
                // console.log('convertTagToArray: ', convertTagToArray);

                const tagObj = Object.assign({}, {
                    index: index,
                    tags: convertTagToArray
                });
                // console.log("tagObj: ", tagObj);

                const newTagsList = new Array(tagObj);
                // console.log("newTagsList: ", newTagsList);
                return {...state, tagsList: newTagsList};

            } else {   /* For new adding tag */ 
                const convertTagToArray = new Array(tag);
                console.log('convertTagToArray: ', convertTagToArray);

                const copyStateTagsList = state.tagsList.map(obj => {
                   return Object.assign({}, {
                        index: obj.index,
                        tags: [...obj.tags]
                    });
                });
                console.log('copyStateTagsList: ', copyStateTagsList);

                const objIndex = copyStateTagsList.findIndex(element => element.index === index);
                console.log("objIndex: ", objIndex);

                if (objIndex > -1) {    /* Add new tag to object with found index */
                    const newTagArray = new Array(copyStateTagsList[objIndex].tags);
                    console.log("newTagArray: ", newTagArray);
                    newTagArray.concat(convertTagToArray);
                    console.log('newTagArray: ', newTagArray);



                } else {    /* Add new tag with new index */

                }
            }

            // const tagObj = (ind, tg) => {
            //     const obj = {};
            //     obj.index = ind;
            //     obj.tags = [];
            //     obj.tags.push(tg);
            //     return obj;
            // };



            // Clears out state.tagExistWarning object
            // if (state.tagExistsWarning !== null) {
            //     state.tagExistsWarning = null;
            // }
            
            // if (state.tagsList === null) {
                // state.tagsList = [];
                // state.tagsList.push(tagObj(index, tag));
            // } else {
                // const tagIndex = state.tagsList.findIndex(element => element.index === index);
                // if (tagIndex > -1) {
                //     if (!state.tagsList[tagIndex].tags.includes(tag)) {
                //         state.tagsList[tagIndex].tags.push(tag);
                //     } else {
                //         state.tagExistsWarning = [];
                //         state.tagExistsWarning.push(index, "'" + tag + "' already does exists. Please enter a new tag.");
                //     }      
                // } else {
                //     state.tagsList.push(tagObj(index, tag));
                // }
            // }
            
            // return {...state, tagsList: state.tagsList, tagExistsWarning: state.tagExistsWarning};    
            // return {...state, tagsList: newTagsList};
        default:
            return state;
    }
}
