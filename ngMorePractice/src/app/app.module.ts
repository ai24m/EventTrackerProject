import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AlgorithmService } from './services/algorithm.service';
import { HomeComponent } from './components/home/home.component';
import { AlgorithmComponent } from './components/algorithm/algorithm.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { DatePipe } from '@angular/common';
import { TrackerService } from './services/tracker.service';
import { FormsModule } from '@angular/forms';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionService } from './services/solution.service';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlgorithmComponent,
    NavbarComponent,
    TrackerComponent,
    SolutionComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlgorithmService,
    TrackerService,
    SolutionService,// rememeber to add each service and pipe injection HERE!
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
