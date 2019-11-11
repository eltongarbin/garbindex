const initialState = {};

export default (state = initialState, { type }: any) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST'
  };
};

export const createLoadingSelector = (actions: any) => (state: any) => {
  return actions.some((action: any) => {
    const actionName =
      typeof action === 'object'
        ? action.REQUEST.replace('_REQUEST', '')
        : action;

    return state.ui.loading[actionName];
  });
};
