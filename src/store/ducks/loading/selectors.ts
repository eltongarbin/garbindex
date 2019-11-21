import { RootState } from 'typesafe-actions';

export const createLoadingSelector = (actionTypes: string[]) => (
  state: RootState
) => {
  return actionTypes.some((actionType) => {
    const actionName = actionType.replace('_REQUEST', '');

    return state.ui.loading[actionName];
  });
};
