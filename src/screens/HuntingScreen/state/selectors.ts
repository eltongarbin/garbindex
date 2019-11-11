import { RootState } from 'typesafe-actions';

export const hasSearched = (state: RootState) => state.huntingScreen.searched;
