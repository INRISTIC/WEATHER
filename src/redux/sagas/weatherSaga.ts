import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putWeatherData, getWeatherData, getWeatherDataByCoords, setError } from '../slices/weatherSlice';
import weatherApi from '../../axios';

function* workerWeatherData(action) {
  try {
    const { lat, lon, weatherUnitType } = action.payload;

    console.log(action.payload)
    const { data } = yield call(
      weatherApi.get,
      `onecall?lat=${lat}&lon=${lon}&units=${weatherUnitType}`
    );

    yield put(putWeatherData(data));
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    yield put(setError(true));
  }
}

function* workerGetWeatherDataBySearch(action) {
  try {
    const { location, weatherUnitType } = action.payload.location;

    const { data } = yield call(
      weatherApi.get,
      `weather?q=${location}&units=${weatherUnitType}`
    );

    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const weatherDataCall = yield call(
      weatherApi.get,
      `onecall?lat=${lat}&lon=${lon}&units=${weatherUnitType}`
    );

    yield put(putWeatherData(weatherDataCall.data));
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    yield put(setError(true));
  }
}

function* watchWeatherDataByCoords() {
  yield takeLatest(getWeatherDataByCoords.type, workerWeatherData);
}

function* watchGetWeatherData() {
  yield takeLatest(getWeatherData.type, workerGetWeatherDataBySearch);
}

export default function* rootSaga() {
  yield all([
    watchGetWeatherData(),
    watchWeatherDataByCoords(),
  ]);
}
