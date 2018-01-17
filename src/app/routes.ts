import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';

export const routes = [
	{ path: '', redirectTo: 'test', pathMatch: 'full' },
	{ path: 'test', component: TestComponent }
];
