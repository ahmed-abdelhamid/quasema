import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';
import filtersReducers from './flitersReducers';
import loadingReducer from './loadingReducer';
import usersReducer from './usersReducer';
import reportsReducer from './reportsReducer';

export default combineReducers({
  auth: authReducer,
  filters: filtersReducers,
  clients: clientsReducer,
  users: usersReducer,
  reports: reportsReducer,
  loading: loadingReducer
});
