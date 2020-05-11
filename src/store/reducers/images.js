let initialState = {
    photos: []
}
const reducer = function(state = initialState, action) {
    switch(action.type) {
        case 'ADD_PHOTOS':
            let photos = [...state.photos];
            photos = action.images
            return {
                ...state,
                photos
            }
            break;
        default:
            return state;
    }
}

export default reducer;