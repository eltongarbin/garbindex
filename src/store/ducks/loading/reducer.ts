import { Action } from 'typesafe-actions';

type LoadingState = Readonly<{
  [Key: string]: boolean;
}>;

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
