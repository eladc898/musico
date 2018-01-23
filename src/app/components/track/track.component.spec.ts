import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackComponent } from './track.component';

fdescribe('TrackComponent', () => {
  const component: TrackComponent = new TrackComponent;

  beforeEach(() => {
    component.ngOnInit();
    component.track = {
      Id: 1,
      bpm: 120,
      owner: 'Ori Winokur',
      url: 'https://s3.amazonaws.com/candidate-task/Track+1.mp3'
    };

    component.leaderTrack = {
      Id: 3,
      bpm: 123,
      owner: 'Barak Inbar',
      url: 'https://s3.amazonaws.com/candidate-task/Track+2.mp3'
    };
    component.isSync = false;
    component.isPlayAll = false;
  });

  it('should init component correctly', () => {
    expect(component).toBeTruthy();
    expect(component.player).toBeUndefined();
    expect(component.progressBar).toBeUndefined();

  });

  it('should init component view correctly', () => {
    component.isPlayAll = true;
    // component.ngOnChanges({});
    expect(component.currentTrackInfo.isPlaying).toBeTruthy();
    expect(component.showOriginalBpm).toBeFalsy();
    
  });
});
