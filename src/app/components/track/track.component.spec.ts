import { Component, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as util from '@angular/core/src/change_detection/change_detection_util';
import { FormsModule } from '@angular/forms';

import { TrackComponent } from './track.component';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  template: ''
})
class TestHostComponent {
  track: any;
}

fdescribe('TrackComponent', () => {
  const component: TrackComponent = new TrackComponent;

  let fixture, track, testHost, element, de;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackComponent, TestHostComponent ],
      imports: [
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TrackComponent);
    track = fixture.componentInstance;
    testHost = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;


    track.ngOnInit();
    track.track = {
      Id: 1,
      bpm: 120,
      owner: 'Ori Winokur',
      url: 'https://s3.amazonaws.com/candidate-task/Track+1.mp3'
    };

    track.leaderTrack = {
      Id: 3,
      bpm: 123,
      owner: 'Barak Inbar',
      url: 'https://s3.amazonaws.com/candidate-task/Track+2.mp3'
    };
    track.isSync = false;
    track.isPlayAll = false;
  });


  it('should init component correctly', () => {
    expect(track).toBeTruthy();
    expect(track.player).toBeUndefined();
    expect(track.progressBar).toBeUndefined();

  });

  it('should init component view correctly', () => {
    testHost.isPlayAll = true;
    console.log('before ?', track);
    // track.ngOnChanges({
    //   isPlayAll: new SimpleChange(null, track.isPlayAll, true)
    // });
    fixture.detectChanges();
    console.log('after ?', track);
    // expect(track.isPlayAll).toBeTruthy();
    // expect(track.player).toBeDefined();
    // expect(track.progressBar).toBeDefined();
  });
});
