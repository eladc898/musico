import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListComponent } from './track-list.component';
import { DropdownComponent } from '../widgets/dropdown/dropdown.component';
import { TrackComponent } from '../track/track.component';
import { DataService } from '../../data-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as _ from 'lodash';

describe('TrackListComponent', () => {
  let fixture, trackListComponent, element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackListComponent, DropdownComponent, TrackComponent ],
      imports: [HttpModule, FormsModule],
      providers: [
        DataService
      ]
    });
    fixture = TestBed.createComponent(TrackListComponent);
    trackListComponent = fixture.componentInstance;
    element = fixture.nativeElement;

    trackListComponent.tracksList = [
      {
        "Id": 1,
        "url": "https://s3.amazonaws.com/candidate-task/Track+1.mp3",
        "owner": "Ori Winokur",
        "bpm": 120
      },
      {
        "Id": 2,
        "url": "https://s3.amazonaws.com/candidate-task/Track+2.mp3",
        "owner": "Yonatan Pistiner",
        "bpm": 100
      },
      {
        "Id": 3,
        "url": "https://s3.amazonaws.com/candidate-task/Track+3.mp3",
        "owner": "Barak Inbar",
        "bpm": 123
      }
    ];
    trackListComponent.trackIds = [];
    _.map(trackListComponent.tracksList, track => {
      trackListComponent.trackIds.push(track.Id);
      track.player = document.createElement('audio');
      track.player.id = 'player-' + track.Id;
      track.player.src = track.url;
      track.progress = document.createElement('input');
      track.progress.id = 'progress-bar-' + track.Id;
      track.progress = document.createElement('input');
    });
  });

  it('should create TrackListComponent', () => {
      expect(trackListComponent).toBeTruthy();
      expect(trackListComponent.displayedTracks.length).toBe(0);
      expect(trackListComponent.tracksList.length).toBe(3);
      expect(trackListComponent.trackIds.length).toBe(3);
      expect(trackListComponent.isSync).toBeFalsy();
      expect(trackListComponent.isPlayAll).toBeFalsy();
  });

  it('should test onTrackSelection() and onRemoveTrack()', () => {
    trackListComponent.onTrackSelection(1);
    expect(trackListComponent.displayedTracks.length).toBe(1);
    expect(trackListComponent.trackIds.length).toBe(2);

    trackListComponent.onRemoveTrack(1);
    expect(trackListComponent.displayedTracks.length).toBe(0);
    expect(trackListComponent.trackIds.length).toBe(3);
  });

  it('should test togglePlayAll()', () => {
    trackListComponent.togglePlayAll();
    expect(trackListComponent.isPlayAll).toBeFalsy();

    trackListComponent.onTrackSelection(1);
    trackListComponent.togglePlayAll();
    expect(trackListComponent.isPlayAll).toBeTruthy();
  });

  it('should test onSync()', () => {
    trackListComponent.onTrackSelection(1);
    trackListComponent.leaderTrack = trackListComponent.tracksList[0];
    trackListComponent.onSync();

    expect(trackListComponent.isPlayAll).toBeTruthy();
    expect(trackListComponent.isSync).toBeTruthy();
  });
});
