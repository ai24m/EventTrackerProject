import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmComponent } from './components/algorithm/algorithm.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SolutionSComponent } from './components/solution-s/solution-s.component';
import { SolutionComponent } from './components/solution/solution.component';
import { TrackerSComponent } from './components/tracker-s/tracker-s.component';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'algorithms', component: AlgorithmComponent},
  { path: 'trackers', component: TrackerSComponent},
  { path: 'algorithms/trackers/:id', component: TrackerComponent},
  { path: 'solutions', component: SolutionSComponent},
  { path: 'algorithms/solutions/:id', component: SolutionComponent},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
