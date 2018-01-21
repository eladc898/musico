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

  playAll = () => {
    
  }

}
