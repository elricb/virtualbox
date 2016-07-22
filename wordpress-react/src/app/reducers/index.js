import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //allow dispatch of a function from an action for async calls

import todos from './todos';
import posts from './posts';
import wordpress from './wordpress';
import visibilityFilter from './visibilityFilter';

const reducers = {
    todos,
    posts,
    visibilityFilter,
    wordpress
};
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default store;
