import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service';
import * as _ from 'lodash';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

  tracksList = [];
  displayedTracks = [];
  trackIds = [];
  leaderTrack;
  isPlayAll = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAll().then(data => {
      this.tracksList = data['TrackList'];
      console.log('this.tracksList', this.tracksList);
      _.map(this.tracksList, track => {
        this.trackIds.push(track.Id);
      });
    }).catch((err: any) => console.log(err));
  }
  onTrackSelection = (id: number) => {
    const track = _.find(this.tracksList, t => t.Id === id);
    this.displayedTracks.push(track);
    _.remove(this.trackIds, tid => tid === id);
  }

  onRemoveTrack = (id: number) => {
    _.remove(this.displayedTracks, t => t.Id === id);
    this.trackIds.push(id);
    this.trackIds.sort((a, b) => a - b);
  }

  onAddPlayer = (playerObj: any) => {
    console.log('onAddPlayer');
    console.log('id', playerObj.id);
    console.log('duration', playerObj.player.duration);
    this.displayedTracks[this.displayedTracks.length - 1].player = playerObj.player;
    this.displayedTracks[this.displayedTracks.length - 1].duration = playerObj.player.duration;
    this.displayedTracks[this.displayedTracks.length - 1].progress = playerObj.progress;
    const currentTrack = _.find(this.displayedTracks, t => t.Id === playerObj.id);
    if (!this.leaderTrack) {
      this.leaderTrack = currentTrack;
    }
    else {
      if (currentTrack.duration > this.leaderTrack.duration) {
        this.leaderTrack = currentTrack;
        console.log('update leader', this.leaderTrack);
      }
    }
    console.log(this.displayedTracks);
  }

  togglePlayAll = () => {
    this.isPlayAll = !this.isPlayAll;
  }

  onSync = () => {
    console.log('this.leaderTrack' , this.leaderTrack);
    
    const leaderProgressVal = this.leaderTrack.player.currentTime / this.leaderTrack.duration;
    console.log('value' , leaderProgressVal);
    _.each(this.displayedTracks, track => track.progress.value = leaderProgressVal);
    this.displayedTracks = _.orderBy(this.displayedTracks, 'duration', 'desc');
    this.isPlayAll = true;
  }
}
