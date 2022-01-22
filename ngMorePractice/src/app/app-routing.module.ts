import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmComponent } from './components/algorithm/algorithm.component';
import { HomeComponent } from './components/home/home.component';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'algorithms', component: AlgorithmComponent},
  // { path: 'trackers', component: TrackerComponent},
  { path: 'algorithms/trackers/:id', component: TrackerComponent},
  // { path: 'solutions', component: SolutionComponent},
  // { path: 'algorithms/:id/solutions', component: SolutionComponent},
  // { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
