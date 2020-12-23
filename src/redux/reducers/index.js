import loggedReducer from './is-logged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer
});

export default allReducers;