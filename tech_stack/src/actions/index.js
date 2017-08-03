export const selection = (selectedId) => {
    return {
        type: 'SELECTED_LIBRARY',
        payload: selectedId
    };
};
