import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./rootAction').default>;
  export type RootState = StateType<typeof import('./rootReducer').default>;

  interface Types {
    RootAction: RootAction;
  }
}
