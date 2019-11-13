import { LoadingState } from './types';

const initialState: LoadingState = {};

export default (state = initialState, { type }: any) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST'
  };
};
