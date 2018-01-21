import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy {

  @Output() onSelection: EventEmitter<string> = new EventEmitter<string>();

  @Input() options: string[];
  @Input() selectedOption = '';
  @Input() placeholderText = '';

  @Input() clickableWidth = 300;

  @Input() withValidations = false;

  @Input() showValidationWarning$: Observable<boolean>;
  showWarning = false;

  @Input() reset$: Observable<any>;
  resetSubscription: Subscription;

  show = false;

  ngOnInit() {
    if (this.reset$) {
      this.resetSubscription = this.reset$.subscribe(reset => {
        this.reset();
      });
    }
    if (this.withValidations) {
      this.showValidationWarning$.subscribe(showWarning => {
        this.showWarning = showWarning;
      });
    }
  }

  ngOnDestroy() {
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }

  select(newOpt: string) {
    this.selectedOption = newOpt;
    this.notify(newOpt);
  }

  initialOptionExists() {
    return this.selectedOption !== '';
  }

  notify(state: string) {
    this.onSelection.emit(state);
  }

  reset = () => {
    this.selectedOption = '';
  }
}

