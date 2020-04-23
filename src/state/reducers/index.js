import { combineReducers } from 'redux';
import appReducer from './app.reducer';
import bitCoinReducer from './bitcoin.reducer';

const rootReducer = combineReducers({
  appReducer,
  bitCoinReducer,
});
export default rootReducer;
