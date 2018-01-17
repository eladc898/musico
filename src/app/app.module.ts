import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './routes';

import { AppComponent } from './app.component';
import { TrackComponent } from './components/track/track.component';
import { TrackListComponent } from './components/track-list/track-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    TrackListComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
	constructor() {
	}
}
