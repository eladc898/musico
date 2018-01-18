import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

  tracksList = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAll().then(data => {
      this.tracksList = data['TrackList'];
      console.log('this.tracksList', this.tracksList);
    }).catch((err: any) => console.log(err));
  }
}
