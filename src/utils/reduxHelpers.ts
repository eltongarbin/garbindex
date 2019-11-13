import { call, put } from 'redux-saga/effects';
import { isEmpty } from 'lodash-es';

export function* genericAsyncResolver(
  fnService: any,
  parameter: any,
  asyncActions: any,
  cbFormatData: any
) {
  try {
    const data = yield call(fnService, parameter);

    let dataFormatted;
    if (cbFormatData && !isEmpty(data)) {
      dataFormatted = yield cbFormatData(data);
    }

    yield put(asyncActions.success(dataFormatted || data));
  } catch (error) {
    yield put(asyncActions.failure(error));
  }
}
