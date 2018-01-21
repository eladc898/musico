import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, AfterViewInit  {

  @Input() track: any;

  @Output() removeTrackEvt: EventEmitter<string> = new EventEmitter<string>();

  player;
  progressBar;
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
    this.player = document.getElementById('player-' + this.track.Id);
    this.progressBar = document.getElementById('progress-bar-' + this.track.Id);
    this.player.addEventListener('timeupdate' , this.updateProgressBar);
  }
  updateProgressBar = () => {
    if (!this.player) { return; }
    console.log('currentTime', this.player.currentTime);
    console.log('duration', this.player.duration);
    this.progressBar.value = this.player.currentTime / this.player.duration ;
  }

  togglePlay = () => {
    console.log('this.track', this.track);
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
  removeTrack = () => {
    this.removeTrackEvt.emit(this.track.Id);
  }

  getCurrentProgress = () => {
    if (!this.player) { return 0; }
    return this.player.currentTime / this.player.duration;

  }
}
