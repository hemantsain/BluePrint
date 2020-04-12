import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './app-saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware)),
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  return {
    store,
    persistor,
  };
};
export default configureStore;
