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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlgorithmComponent,
    NavbarComponent,
    TrackerComponent
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
    // rememeber to add each service and pipe injection HERE!
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
