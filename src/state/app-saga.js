import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './action-types';
import { fetchListData, fetchBitCoinData } from './api';

function* getSearchListSaga(action) {
  try {
    const result = yield call(fetchListData, action.payload);
    yield put({ type: ActionTypes.FETCH_LIST_SUCCESS, result });
  } catch (error) {
    yield put({ type: ActionTypes.FETCH_LIST_ERROR, error });
  }
}

function* fetchBitCoinSaga(action) {
  try {
    const result = yield call(fetchBitCoinData, action.payload);
    yield put({ type: ActionTypes.FETCH_BITCOIN_SUCCESS, result });
  } catch (error) {
    yield put({ type: ActionTypes.FETCH_BITCOIN_ERROR, error });
  }
}

export default function* watchUserSaga() {
  yield takeEvery(ActionTypes.FETCH_LIST_REQUEST, getSearchListSaga);
  yield takeEvery(ActionTypes.FETCH_MORE_REQUEST, getSearchListSaga);
  yield takeEvery(ActionTypes.FETCH_BITCOIN_REQUEST, fetchBitCoinSaga);
}
