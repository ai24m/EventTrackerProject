import { Component, OnInit } from '@angular/core';
import { Tracker } from 'src/app/models/tracker';
import { Algorithm } from 'src/app/models/algorithm';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-tracker-s',
  templateUrl: './tracker-s.component.html',
  styleUrls: ['./tracker-s.component.css']
})
export class TrackerSComponent implements OnInit {
  trackers: Tracker[] = [];
  algorithms: Algorithm[] = [];

  constructor(
    private trackService: TrackerService,
    private algoService: AlgorithmService,
  ) { }

  ngOnInit(): void {
    this.algoService.index().subscribe({
      next: (algorithm) => {
        this.algorithms = algorithm;
        this.algorithms.forEach(element => {
          this.loadTrackers(element.id);
        });
      },
      error:  (fail) => {
        console.error('Load Algorithm error' + fail)
      }
    });
    this.algorithms.forEach(
      (algorithm) => this.loadTrackers(algorithm.id));
  }

  loadTrackers(id: number) {
    this.trackService.index(id).subscribe(
      tracker => this.trackers = tracker,
      error => console.error('Load Solution error' + error)
    )
  }
}
