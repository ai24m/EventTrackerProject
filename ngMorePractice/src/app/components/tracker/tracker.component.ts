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
  editTracker = false;

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
      //  let id = this.route.snapshot.params['id'];
      //  let todo = this.todoService.show(id);
      //  this.selected = todo;
    }




    // let getAlgorithmId = this.route.snapshot.paramMap.get('id');
    // console.log(getAlgorithmId);
    // if (getAlgorithmId != null) { //if algorithm is not null find all trackers[] associated
    //   let id = Number.parseInt(getAlgorithmId);
    //   if (!isNaN(id)) {
    //     this.algoService.show(id).subscribe({
    //       next: (algo) => {
    //         this.algorithm = algo;
    //         this.loadTrackers(id);
    //       },
    //       error: (fail) => {
    //         console.error('Load Algorithm error')}
    //       })
    //   }
    //   this.trackerService.index(id).subscribe({
    //     next: (allTrackers) => {
    //       this.trackers = allTrackers;
    //     },
    //     error: (fail) => {
    //       console.error('TrackerListComponent.ngoninit()')
    //       // this.router.navigateByUrl('notfound'); //fall through in app router
    //     }
    //   })
    // }
  }

  // loadAlgorithm() {
  //   this.algoService.index().subscribe(
  //     algo => this.algorithms = algo,
  //     err => console.error('Reload error' + err)
  //   );
  // }

  loadTracker() {
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
        this.loadTrackers(id);
      },
      err => console.error('Addtodo error' + err)
    );
  }

  updateTracker(tracker: Tracker, id: number, tId: number): void{
    let userId = 1;
    this.trackerService.update(tracker, userId, id, tId).subscribe({
      next: (tracker) => {
        // if (goToDetails) { this.selected = tracker; }
        this.loadTrackers(id);
      },
      error: (fail) => { console.error('Error updating' + fail);}
    });
  }

  deleteTracker(id: number, tId: number) {
    let userId = 1;
    this.trackerService.destroy(userId, id, tId).subscribe({
      next: () => { this.loadTrackers(id)},
      error: () => { console.error('Destroy component.ts')}
    });
  }
}

