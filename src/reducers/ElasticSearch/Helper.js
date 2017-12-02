export const setUsers = (state, data) => {
    // FROMATS TO USER DATA TO GET THE REQUIRED FIELDS
    let isConnected = data.connected;
    let userData = (data.data).map((user, index) => {
        return {
            id: user._id,
            ...user._source
        }
    })
    return Object.assign({}, state, {
        isUpdating: false,
        isConnected: isConnected,
        users: userData
    });
};

export const reconnectElasticSearch = (state, data) => {
    let isConnected = data.connected;
    return Object.assign({}, state, {
        isConnected: isConnected
    });
};

export const openCloseModal = (state, data) => {
    return Object.assign({}, state, {
        modalData: {
            type: data.type,
            selectedUser: data.selectedUser
        }
    });
};

export const onAddedUser = (state, data) => {
    return Object.assign({}, state, {
        users: state.users.concat(data)
    });
};

export const onEditedUser = (state, data) => {
    let updatedState = state;
    (state.users).map((user, index) => {
        if(user.id === data.id) {
            updatedState.users[index] = data;
        }
        return {};
    });
    return Object.assign({}, updatedState);
};

export const onDeletedUser = (state, data) => {
    let updatedUser = [];
    (state.users).map((user, index) => {
        if(user.id !== data.id) {
            updatedUser.push(user);
        }
        return {};
    });
    return Object.assign({}, state, {
        users: updatedUser
    });
};