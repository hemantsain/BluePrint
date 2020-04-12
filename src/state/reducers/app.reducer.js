import { ActionTypes } from '../action-types';

const initialState = {
  isLoading: false,
  listData: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        listData: [],
      };
    case ActionTypes.FETCH_MORE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.FETCH_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listData: [...state.listData, ...action.result],
      };
    default:
      return state;
  }
}
export default appReducer;
