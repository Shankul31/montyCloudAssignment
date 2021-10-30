import { combineReducers } from 'redux';
import newsReducer from './newsReducer';

const reducers = combineReducers({
    AllNewsFeeds: newsReducer
})

export default reducers;