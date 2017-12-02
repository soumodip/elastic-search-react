import  elasticSearchState from './State';
import { setUsers, reconnectElasticSearch, openCloseModal, onAddedUser, 
         onEditedUser, onDeletedUser } from './Helper';

function elasticSearchReducer( state = elasticSearchState, action ) {
    switch(action.type) {
        case "SET_USERS":
            return setUsers(state, action.payload);
        case "RECONNECT_ELASTIC_SEARCH":
            return reconnectElasticSearch(state, action.payload);
        case "OPEN_CLOSE_MODAL":
            return openCloseModal(state, action.payload);
        case "ON_ADDED_USER":
            return onAddedUser(state, action.payload);
        case "ON_EDITED_USER":
            return onEditedUser(state, action.payload);
        case "ON_DELETED_USER":
            return onDeletedUser(state, action.payload);
        default:
            return state;
    }
}

export default elasticSearchReducer;