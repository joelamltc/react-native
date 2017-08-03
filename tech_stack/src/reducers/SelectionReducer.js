export default (state = null, action) => {
    switch (action.type) {
        case 'SELECTED_LIBRARY':
            return action.payload;

        default:
            return state;
    }
};
