import { createAction } from 'redux-actions';
import { call, put } from 'redux-saga/effects';
import isEmpty from 'lodash.isempty';

export const createType = (stateKey, type) =>
  `${process.env.REACT_APP_NAME}/${stateKey}/${type}`;

export const createAsyncTypes = (stateKey, type) => ({
  REQUEST: `${createType(stateKey, type)}_REQUEST`,
  SUCCESS: `${createType(stateKey, type)}_SUCCESS`,
  FAILURE: `${createType(stateKey, type)}_FAILURE`
});

export const createAsyncActions = (asyncTypes) => ({
  request: createAction(asyncTypes.REQUEST),
  receive: createAction(asyncTypes.SUCCESS),
  error: createAction(asyncTypes.FAILURE)
});

export function* genericAsyncResolver(
  fnService,
  parameter,
  asyncActions,
  cbFormatData
) {
  try {
    const data = yield call(fnService, parameter);

    let dataFormatted;
    if (cbFormatData && !isEmpty(data)) {
      dataFormatted = yield cbFormatData(data);
    }

    yield put(asyncActions.receive(dataFormatted || data));
  } catch (error) {
    yield put(asyncActions.error(error));
  }
}
