const initialState = {};

export default (state = initialState, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST'
  };
};

export const createLoadingSelector = (actions) => (state) => {
  return actions.some((action) => {
    const actionName =
      typeof action === 'object'
        ? action.REQUEST.replace('_REQUEST', '')
        : action;

    return state.ui.loading[actionName];
  });
};
