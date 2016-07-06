import { combineReducers } from 'redux';
import posts from './posts.js';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
   switch (action.type) {
       case 'ADD_TODO':
           //clone state (array spread operator)
           return [
               ...state,
               todo(undefined, action)
           ];
       case 'TOGGLE_TODO':
           //clone state and toggle only the action of current
           return state.map(t =>
               todo(t, action)
           );
       default:
           return state;
   }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};



//state keys and reducers are using the same name:
const appReducer = combineReducers({
    todos,
    visibilityFilter,
    posts
});


export default appReducer;
