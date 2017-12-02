const elasticSearchState = {
    isUpdating: true,
    isConnected: true,
    modalData: {
        type: -1, // 0 - ADD/EDIT, 1 - DELETE
        selectedUser: []
    },
    users: []
};

export default elasticSearchState;