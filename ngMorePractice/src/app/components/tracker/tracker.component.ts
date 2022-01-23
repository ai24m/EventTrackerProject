import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tracker } from 'src/app/models/tracker';
import { Algorithm } from 'src/app/models/algorithm';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  trackers: Tracker[] = [];
  newTracker: Tracker = new Tracker();
  tracker: Tracker = new Tracker();
  algorithms: Algorithm[] = [];
  selected: Algorithm | null = null;
  selectedT: Tracker | null = null;


  constructor(private trackerService: TrackerService,
    private algoService: AlgorithmService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let idString = this.route.snapshot.paramMap.get('id');
    if (!this.selected && idString) {
      let id = Number.parseInt(idString);
      if (!isNaN(id)) {
        this.algoService.show(id).subscribe({
          next: (algo) => {
            this.selected = algo;
            this.loadTrackers(id);
          },
          error: (fail) => {
            console.error('TrackerComponent.ngoninit()')
            this.router.navigateByUrl('notfound'); //fall through in app router
          }
        })
      } else {
        this.router.navigateByUrl('notfound');
      }
    }
  }

  showDiv = {
    addTracker: false,
    editTracker: false,
    deleteTracker: false,
  }

  pass = false;

  displayTracker(track: Tracker) {
    // this.trackerService.show(track.id).subscribe({
    //   next: (tracker) => {
    //     this.selectedT = tracker;
    //     console.log(this.selectedT);
    //   }
    // })
    this.selectedT = track;
  }

  loadAlgorithm() {
    this.algoService.index().subscribe(
      algo => this.algorithms = algo,
      err => console.error('Reload error' + err)
    );
  }

  loadTrackers(id: number){
    this.trackerService.index(id).subscribe(
      allTrackers => this.trackers = allTrackers,
      error => console.error('Load Trackers error' + error)
    );
  }

  createTracker(tracker: Tracker, id: number) {
    let userId = 1;
    this.trackerService.create(tracker, userId, id).subscribe(
      success => {
        this.newTracker = new Tracker();
        this.ngOnInit();
      },
      err => console.error('Addtodo error' + err)
    );
  }

  updateTracker(tracker: Tracker, id: number, tId: number): void{
    let userId = 1;
    this.trackerService.update(tracker, userId, id, tId).subscribe({
      next: (tracker) => {
        this.ngOnInit();
      },
      error: (fail) => { console.error('Error updating' + fail);}
    });
  }

  destroyTracker(id: number, tId: number) {
    let userId = 1;
    this.trackerService.destroy(userId, id, tId).subscribe({
      next: () => {
        this.loadTrackers(id),
        this.ngOnInit();
      },
      error: () => {
        console.error('Destroy component.ts')
      }
    });
  }
}

