let initialState = {
    photos: [],
    modalPhoto: []
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
        case 'MODAL_PHOTOS':
            let modalPhoto = [...state.modalPhoto];
            modalPhoto = [action.image]
            return {
                ...state,
                modalPhoto
            }
            break;
        default:
            return state;
    }
}

export default reducer;