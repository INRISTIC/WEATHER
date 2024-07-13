import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherReducer from './slices/weatherSlice';
import rootSaga from './sagas/weatherSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
