import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() track: any;
  @Input() isPlayAll: boolean;

  @Output() removeTrackEvt: EventEmitter<string> = new EventEmitter<string>();
  @Output() addPlayerEvt: EventEmitter<any> = new EventEmitter<any>();

  STARTING_OFFSET = 113;
  player;
  progressBar;
  circleprogressBar;
  currentTrackInfo: {
    isPlaying: boolean;
    isMuted: boolean;
  };
  constructor() { }

  ngOnInit() {
    this.currentTrackInfo = { isPlaying: false,
                              isMuted: false };
  }

  ngAfterViewInit() {
    this.player = document.getElementById('player-' + this.track.Id);
    this.progressBar = document.getElementById('progress-bar-' + this.track.Id);
    this.circleprogressBar = document.getElementById('circle-' + this.track.Id);
    this.player.addEventListener('timeupdate' , this.updateProgressBar);
    this.player.addEventListener('ended', this.resetTrack);
    this.player.addEventListener('loadedmetadata', () => {
      this.addPlayerEvt.emit({id : this.track.Id, player: this.player, progress: this.progressBar});
      }, false);
  }

  ngOnChanges (changes: SimpleChanges) {
    if (!this.currentTrackInfo) { return; }
    this.player.currentTime = 0;
    if (this.isPlayAll) {
      this.currentTrackInfo.isPlaying = true;
      this.player.play();
      this.player.loop = true;
    }
    else {
      this.currentTrackInfo.isPlaying = false;
      this.player.pause();
    }
  }

  updateProgressBar = () => {
    if (!this.player) { return; }
    console.log('currentTime', this.player.currentTime);
    console.log('duration', this.player.duration);
    this.progressBar.value = this.player.currentTime / this.player.duration;
    this.circleprogressBar.style['stroke-dashoffset'] = (this.progressBar.value * this.STARTING_OFFSET + this.STARTING_OFFSET)  + 'px';
  }

  resetTrack = () => {
    this.player.currentTime = 0;
    this.currentTrackInfo.isPlaying = false;
  }

  togglePlay = () => {
    this.currentTrackInfo.isPlaying = !this.currentTrackInfo.isPlaying;
    if (this.currentTrackInfo.isPlaying) {
      this.player.play();
      this.player.loop = false;
    }
    else {
      this.player.pause();
    }
  }
  toggleVolume = () => {
    this.currentTrackInfo.isMuted = !this.currentTrackInfo.isMuted;
    if (this.currentTrackInfo.isMuted) {
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
  
  getNameFromUrl = (url: string) => {
    const tmpArr = url.split('/');
    return tmpArr[tmpArr.length - 1].split('.')[0].replace('+', ' ');
  }
}
