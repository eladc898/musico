import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TrackComponent } from './track.component';

describe('TrackComponent', () => {
  let fixture, track, element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackComponent ],
      imports: [
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TrackComponent);
    track = fixture.componentInstance;
    element = fixture.nativeElement;

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

    track.player = document.createElement('audio');
    track.player.id = 'player-' + track.Id;
    track.player.src = track.url;
  });


  it('should create TrackComponent', () => {
    expect(track).toBeTruthy();
    expect(track.volume).toBeGreaterThan(0);
    expect(track.currentTrackInfo).toBeDefined();
    expect(track.player).toBeDefined();
    expect(track.progressBar).toBeUndefined();
  });

  it('should reset component', () => {
    track.currentTrackInfo.isPlaying = true;
    track.player.currentTime = 12;
    track.resetTrack();
    expect(track.currentTrackInfo.isPlaying).toBeFalsy();
    expect(track.player.currentTime).toBe(0);
  });

  it('should test togglePlay()', () => {
    track.togglePlay();
    expect(track.currentTrackInfo.isPlaying).toBeTruthy();
    expect(track.player.loop).toBeFalsy();
  });

  it('should test toggleVolume()', () => {
    track.toggleVolume();
    expect(track.currentTrackInfo.isMuted).toBeTruthy();
    track.toggleVolume();
    expect(track.currentTrackInfo.isMuted).toBeFalsy();
  });
});
