import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Output() onSelection: EventEmitter<string> = new EventEmitter<string>();

  @Input() options: string[];
  @Input() selectedOption = '';
  @Input() placeholderText = '';

  @Input() clickableWidth = 300;

  @Input() withValidations = false;

  showWarning = false;

  @Input() reset$: Observable<any>;

  show = false;

  ngOnInit() {
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

