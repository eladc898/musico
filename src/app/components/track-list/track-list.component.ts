import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service';
import * as _ from 'lodash';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

  // all tracks from json
  tracksList = [];
  // tracks to displaye
  displayedTracks = [];
  // track id's for dropdown list
  trackIds = [];
  // the leader track - leader is the longest track
  leaderTrack;
  // isPlayAll flag
  isPlayAll = false;
  // isSync flag
  isSync = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // get data from json:
    this.dataService.getAll('./assets/trackList.json').then(data => {
      this.tracksList = data['TrackList'];
      console.log('tracks list: ', this.tracksList);
      // save the id's of tracks for dropdown list
      _.map(this.tracksList, track => {
        this.trackIds.push(track.Id);
      });
    }).catch((err: any) => console.log(err));
  }

  /* On dropdown selection:
   1.push the track to the displayed tracks
   2.remove track from dropdown
  */
  onTrackSelection = (id: number) => {
    const track = _.find(this.tracksList, t => t.Id === id);
    this.displayedTracks.push(track);
    _.remove(this.trackIds, tid => tid === id);
  }

  /* On remove single track:
   1.remove the track from the displayed tracks
   2.push track to dropdown
   3.sort track id's dropdown list
  */
  onRemoveTrack = (id: number) => {
    _.remove(this.displayedTracks, t => t.Id === id);
    this.trackIds.push(id);
    this.trackIds.sort((a, b) => a - b);
  }

  /* On adding track to UI event(from track component):
   1.save info for relevant track
   2.calculate the new leader track
  */
  onAddPlayer = (playerObj: any) => {
    this.displayedTracks[this.displayedTracks.length - 1].player = playerObj.player;
    this.displayedTracks[this.displayedTracks.length - 1].duration = playerObj.player.duration;
    this.displayedTracks[this.displayedTracks.length - 1].progress = playerObj.progress;
    const currentTrack = _.find(this.displayedTracks, t => t.Id === playerObj.id);
    // cases when I should update the leader track:
    // 1.first init of leader track OR
    // 2.new track is the new leader
    if (!this.leaderTrack || this.leaderTrack && currentTrack.duration > this.leaderTrack.duration) {
      this.leaderTrack = currentTrack;
    }
  }

  /* On playAll toggle:
   update isPlayAll flag (that the track component is listening to by Input)
  */
  togglePlayAll = () => {
    // case there are no tracks to display - playAll is disabled - nothing should happend
    if (this.displayedTracks.length < 1) { return; }
    this.isPlayAll = !this.isPlayAll;
    // when stop all: reset syncing
    if (!this.isPlayAll) { this.isSync = false; }
  }

  /* On sync click:
    1.calculate leader's current progress
    2.update all other tracks to the leader's progress
    3.sort the displayed tracks from the longest to the shortest
    4.update to leader's bpm
    5.apply playAll event
  */
  onSync = () => {
    const leaderProgressVal = this.leaderTrack.player.currentTime / this.leaderTrack.duration;
    _.each(this.displayedTracks, track => track.progress.value = leaderProgressVal);
    this.displayedTracks = _.orderBy(this.displayedTracks, 'duration', 'desc');
    this.isSync = true;
    this.isPlayAll = true;
  }
}
