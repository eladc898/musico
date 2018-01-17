import { Routes, RouterModule } from '@angular/router';
import { TrackListComponent } from './components/track-list/track-list.component';
export const routes = [
	{ path: '', redirectTo: 'track_list', pathMatch: 'full' },
	{ path: 'track_list', component: TrackListComponent }
];
