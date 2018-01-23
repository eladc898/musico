import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

// Generic dropdown widget with input list to display
export class DropdownComponent implements OnInit {

  // send the selected object to the parent event
  @Output() onSelection: EventEmitter<string> = new EventEmitter<string>();

  @Input() options: string[];
  @Input() selectedOption = '';
  @Input() placeholderText = '';

  @Input() clickableWidth = 300;

  show = false;

  static changeSelected = (options: string[], option: string, index: number) => {
    options[index] = option;
    return options[index];
  }

  constructor() {}

  ngOnInit() {
  }

  // update selected option and send it to the parent component
  select(newOpt: string) {
    this.selectedOption = newOpt;
    this.notify(newOpt);
  }

  // emit selection event
  notify(state: string) {
    this.onSelection.emit(state);
  }

  reset = () => {
    this.selectedOption = '';
  }
}

