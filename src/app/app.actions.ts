import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Action } from 'redux';

import { IAppState } from './app.state';

export interface IAppAction extends Action {
  counter: number;
}

@Injectable()
export class AppActions {

  static INCREMENT  = 'app_increment';
  static DECREMENT  = 'app_decrement';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  increment = () => {
    this.ngRedux.dispatch({
      type: AppActions.INCREMENT
    });
  }

  decrement = () => {
    this.ngRedux.dispatch({
      type: AppActions.DECREMENT
    });
  }
}
