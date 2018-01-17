export interface IGlobalState {
  counter: number;
}

export const INITIAL_STATE_GLOBAL = {
  counter: 0
};

export interface IAppState {
  global: IGlobalState;
}

export const INITIAL_STATE: IAppState = {
  global: INITIAL_STATE_GLOBAL
};
