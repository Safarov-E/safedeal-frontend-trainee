let initialState = {
    photos: [],
    modalPhoto: [],
    comments: []
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
        case 'MODAL_COMMENT':
            let comments = [...state.comments];
            comments = [action.comments]
            return {
                ...state,
                comments
            }
            break;
        case 'ADD_COMMENT':
            let addComments = state.comments.push(action.comment)
            // let addComments = [...state.comments];
            // addComments = [action.comment];
            // console.log('wgegwewgeewg', action.comment)
            return {
                ...state,
                addComments
            }
            break;
        default:
            return state;
    }
}
export default reducer;