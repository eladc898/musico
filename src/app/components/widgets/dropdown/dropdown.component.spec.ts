import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

const component: DropdownComponent = new DropdownComponent;

describe('DropdownComponent', () => {
  const options = ['track 1', 'track 2', 'track 3'];

  it('should change options array values', () => {
    let val = DropdownComponent.changeSelected(options, 'track 4', 0);
    expect(val).toEqual('track 4');
    expect(val).not.toEqual('track 1');
    val = DropdownComponent.changeSelected(options, 'track 5', 0);
    expect(val).toEqual('track 5');
    expect(val).not.toEqual('track 4');
  });

  it('should change selected option', () => {
    expect(component.selectedOption).toEqual('');
    component.selectedOption = 'option 2';
    component.select('option 1');
    expect(component.selectedOption).toEqual('option 1');
    expect(component.selectedOption).not.toEqual('option 2');
  });
});
