import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as Consts from '../../constants';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, AfterViewInit, OnChanges {

  // input track from track list:
  @Input() track: any;
  // input leaderTrack from track list:
  @Input() leaderTrack: any;
  // input: playAll is on/off
  @Input() isPlayAll: boolean;
  // input: isSync is on/off
  @Input() isSync: boolean;

  @Output() removeTrackEvt: EventEmitter<string> = new EventEmitter<string>();
  @Output() addPlayerEvt: EventEmitter<any> = new EventEmitter<any>();

  // the player element
  player;
  // the progress element
  progressBar;
  // the circular progress element
  circleprogressBar;
  // track info:
  currentTrackInfo: {
    isPlaying: boolean;
    isMuted: boolean;
  };
  // which bpm to show
  showOriginalBpm = true;
  // displaying number of track bars for this track
  trackBars = 0;
  // volume value
  volume = 0.5;

  constructor() { }

  ngOnInit() {
    // init needed values for this track
    this.currentTrackInfo = { isPlaying: false,
                              isMuted: false };
  }

  /* when UI is loaded:
    1.save the needed elements in component variables
    2.binding events : timeupdate - track is playing
                       ended - track finished playing
                       loadedmetadata - audio player is loaded - emit the values to the track list
  */
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

  // listen to input changes
  ngOnChanges (changes: SimpleChanges) {
    console.log('changes', changes);
    if (!this.currentTrackInfo) { return; }
    /* when isPlayAll changing:
      1.reset player to the beginning
      2.when isPlayAll is on: start play track in loop and calculate trackBars
      3.when isPlayAll is off: stop track
    */
    this.player.currentTime = 0;
    if (this.isPlayAll) {
      this.currentTrackInfo.isPlaying = true;
      this.getTrackBars();
      this.player.play();
      this.player.loop = true;
    }
    else {
      this.currentTrackInfo.isPlaying = false;
      this.player.pause();
    }
    // show leader's bpm when sync is on
    if (this.isSync) {
      this.showOriginalBpm = false;
    }
  }

  /* On timeupdate event of the progress bar:
    calculate the progress value in percentage and update both of the progress bars.
  */
  updateProgressBar = () => {
    // when the player metadata isn't loaded yet: ignore the event
    if (!this.player) { return; }
    this.progressBar.value = this.player.currentTime / this.player.duration;
    this.circleprogressBar.style['stroke-dashoffset'] = (this.progressBar.value * Consts.STARTING_OFFSET
       + Consts.STARTING_OFFSET)  + 'px';
  }

  /* On ended event of the player:
    1.reset the player
    2.update track's info
  */
  resetTrack = () => {
    this.player.currentTime = 0;
    this.currentTrackInfo.isPlaying = false;
  }

  /* On change Volume event of the volume-bar:
    update player's volume
  */
  changeVolume = (evt) => {
    this.player.volume = this.volume;
  }

  /* On play toggle:
   1.update track info
   2.play/pause player according to active flag
  */
  togglePlay = () => {
    this.currentTrackInfo.isPlaying = !this.currentTrackInfo.isPlaying;
    if (this.currentTrackInfo.isPlaying) {
      this.getTrackBars();
      this.player.play();
      this.player.loop = false;
    }
    else {
      this.player.pause();
    }
  }

  /* On volume toggle:
   1.update track info and present relevant icon
   2.muted/umnute player according to active flag
  */
  toggleVolume = () => {
    this.currentTrackInfo.isMuted = !this.currentTrackInfo.isMuted;
    if (this.currentTrackInfo.isMuted) {
      this.player.muted = true;
    }
    else {
      this.player.muted = false;
    }
  }

  // on remove click: emit event to trackList component to delete it from displayed list
  removeTrack = () => {
    this.removeTrackEvt.emit(this.track.Id);
  }

  // reset to the original bpm on click
  resetBpm = () => {
    this.showOriginalBpm = true;
  }

  // parse track's name fron url
  getNameFromUrl = (url: string) => {
    const tmpArr = url.split('/');
    return tmpArr[tmpArr.length - 1].split('.')[0].replace('+', ' ');
  }

  getTrackBars = () => {
    if (!this.player) { return; }
    this.trackBars = Math.trunc(this.track.bpm / this.player.duration);
  }
}
