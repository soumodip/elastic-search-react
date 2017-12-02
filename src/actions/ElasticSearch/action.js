import axios from 'axios';
import { fetchUsersUrl, reconnectElasticSearchUrl, actionUserUrl } from './../../utils/apiConstants';

export const fetchUsers = (params = {}) => {
    return axios.get(fetchUsersUrl, { params: params });
};

export const setUsers = (data) => {
    return {
        type: "SET_USERS",
        payload: data
    };
};

export const reconnectElasticSearch = () => {
    return axios.get(reconnectElasticSearchUrl);
};

export const onReconnectElasticSearch = (data) => {
    return {
        type: "RECONNECT_ELASTIC_SEARCH",
        payload: data
    };
};

export const openCloseModal = (data) => {
    return {
        type: "OPEN_CLOSE_MODAL",
        payload: data
    };
};

export const addEditUser = (params) => {
    if(params.id !== undefined) {
        return axios({ method: 'POST', url: actionUserUrl, data: params });
    } else {
        return axios({ method: 'PUT', url: actionUserUrl, data: params });
    }
};

export const onAddedUser = (data) => {
    return {
        type: "ON_ADDED_USER",
        payload: data
    };
};

export const onEditedUser = (data) => {
    return {
        type: "ON_EDITED_USER",
        payload: data
    };
};

export const deleteUser = (params) => {
    return axios({ method: 'DELETE', url: actionUserUrl, data: params });
}

export const onDeletedUser = (data) => {
    return {
        type: "ON_DELETED_USER",
        payload: data
    };
};