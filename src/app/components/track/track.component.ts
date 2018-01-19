import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, AfterViewInit  {
  @Input() track: any;
  player: any;
  currentTrack: {
    isPlaying: boolean;
    isMuted: boolean;
  };
  constructor() { }

  ngOnInit() {
    this.currentTrack = { isPlaying: false,
                          isMuted: false  };
  }
  ngAfterViewInit() {
    this.player = document.getElementById('player');
  }
  togglePlay = () => {
    this.currentTrack.isPlaying = !this.currentTrack.isPlaying;
    if (this.currentTrack.isPlaying) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }
  toggleVolume = () => {
    this.currentTrack.isMuted = !this.currentTrack.isMuted;
    if (this.currentTrack.isMuted) {
      this.player.muted = true;
    }
    else {
      this.player.muted = false;
    }
  }

}
