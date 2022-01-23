import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solution } from 'src/app/models/solution';
import { Algorithm } from 'src/app/models/algorithm';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { SolutionService } from 'src/app/services/solution.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  solutions: Solution[] = [];
  selected: Algorithm | null = null;
  algorithms: Algorithm[] = [];

  constructor(
    private solService: SolutionService,
    private algoService: AlgorithmService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let idString = this.route.snapshot.paramMap.get('id');
    if (!this.selected && idString) {
      let id = Number.parseInt(idString);
      if (!isNaN(id)) {
        this.algoService.show(id).subscribe({
          next: (algo) => {
            this.selected = algo;
            this.loadSolutions(id);
          },
          error: (fail) => {
            console.error('SolutionComponent.ngoninit()')
            this.router.navigateByUrl('notfound'); //fall through in app router
          }
        })
      } else {
        this.router.navigateByUrl('notfound');
      }
    }
  }

  // loadAlgorithm() {
  //   this.algoService.index().subscribe(
  //     algo => this.algorithms = algo,
  //     err => console.error('Reload error' + err)
  //   );
  // }

  loadSolutions(id: number){
    this.solService.index(id).subscribe(
      allSolutions => this.solutions = allSolutions,
      error => console.error('Load Trackers error' + error)
    );
  }
}
