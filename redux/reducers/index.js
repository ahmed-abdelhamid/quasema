import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientsReducer from './clientsReducer';
import filtersReducers from './flitersReducers';
import loadingReducer from './loadingReducer';

export default combineReducers({
  auth: authReducer,
  clients: clientsReducer,
  filters: filtersReducers,
  loading: loadingReducer
});
