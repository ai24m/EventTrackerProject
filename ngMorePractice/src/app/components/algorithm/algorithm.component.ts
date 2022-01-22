import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Algorithm } from 'src/app/models/algorithm';
// import { Tracker } from 'src/app/models/tracker';
import { AlgorithmService } from 'src/app/services/algorithm.service';
// import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})

export class AlgorithmComponent implements OnInit {
  algorithms: Algorithm[] = [];
  // trackers: Tracker[] = [];
  selected: Algorithm | null = null;
  // newTracker: Tracker = new Tracker();

  constructor(
    private algoService: AlgorithmService,
    private router: Router,
    // private trackerService: TrackerService
    ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.algoService.index().subscribe(
      algorithm => this.algorithms = algorithm,
      error => console.error('Load Algorithm error' + error)
    )
  }

  displayAlgorithm(algorithm: Algorithm) {
    this.selected = algorithm;
  }

  // loadTrackers(id: number) {
  //   this.trackerService.index(id).subscribe(
  //     tracker => this.trackers = tracker,
  //     error => console.error('Load Tracker error' + error)
  //   )
  // }
}
