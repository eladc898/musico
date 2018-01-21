import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './routes';

import { AppComponent } from './app.component';
import { TrackComponent } from './components/track/track.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { DataService } from './data-service';

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    TrackListComponent,
    DropdownComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule,
    HttpModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
	constructor() {
	}
}
