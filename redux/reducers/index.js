import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';
import filtersReducers from './flitersReducers';
import loadingReducer from './loadingReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  filters: filtersReducers,
  clients: clientsReducer,
  users: usersReducer,
  loading: loadingReducer
});
