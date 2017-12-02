import { combineReducers } from 'redux';
import elasticSearchReducer from  './ElasticSearch/Reducer';

const combineAllReducers = combineReducers({
    elasticSearch: elasticSearchReducer
});

export default combineAllReducers;