import { combineReducers, Reducer, Action } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { IAppState, INITIAL_STATE_GLOBAL, IGlobalState } from './app.state';
import { AppActions, IAppAction, } from './app.actions';

const appReducer = (lastState: IGlobalState, action: IAppAction): IGlobalState => {
  if (lastState === undefined) { return INITIAL_STATE_GLOBAL; }

  switch (action.type) {
    case AppActions.INCREMENT:
      return {...lastState, counter: lastState.counter + 1 };
    case AppActions.DECREMENT:
      return {...lastState, counter: lastState.counter - 1 };
    default:
      return lastState;
  }
};

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  global: appReducer
});
