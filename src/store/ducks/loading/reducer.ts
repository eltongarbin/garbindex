import { LoadingState } from './types';
import { Action } from 'typesafe-actions';

const initialState: LoadingState = {};

export default (state = initialState, { type }: Action) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST'
  };
};
