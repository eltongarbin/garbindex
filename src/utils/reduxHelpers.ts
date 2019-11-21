import { call, put } from 'redux-saga/effects';
import { isEmpty } from 'lodash-es';

interface IAsyncActions {
  success: (payload: any) => any;
  failure: (payload: Error) => any;
}

export function* genericAsyncResolver(
  fnService: (param: any) => Promise<any>,
  parameter: any,
  asyncActions: IAsyncActions,
  cbFormatData?: (data: any) => any
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
