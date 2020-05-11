const initialState = {
    photos: []
}
function addPhotos(state, photo) {
    return {
        ...state,
        photo
    }
}
const reducer = function(state = initialState, action) {
    switch(action.type) {
        case 'ADD_PHOTOS':
            return addPhotos(state, action.photo);
            break;
        default:
            return state;
    }
}

export default reducer;