import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './routes';

import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TrackComponent
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
