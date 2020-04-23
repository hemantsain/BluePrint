import { ActionTypes } from '../action-types';

const initialState = {
  isLoading: false,
  bitCoinData: {},
};

function bitCoinReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_BITCOIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        bitCoinData: null,
      };
    case ActionTypes.FETCH_BITCOIN_ERROR:
      return {
        ...state,
        isLoading: false,
        bitCoinData: null,
      };
    case ActionTypes.FETCH_BITCOIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bitCoinData: action.result,
      };
    default:
      return state;
  }
}
export default bitCoinReducer;
