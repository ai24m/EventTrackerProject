import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solution } from 'src/app/models/solution';
import { Algorithm } from 'src/app/models/algorithm';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { SolutionService } from 'src/app/services/solution.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-solution-s',
  templateUrl: './solution-s.component.html',
  styleUrls: ['./solution-s.component.css']
})
export class SolutionSComponent implements OnInit {
  solutions: Solution[] = [];
  algorithms: Algorithm[] = [];

  constructor(
    private solService: SolutionService,
    private algoService: AlgorithmService,
  ) { }

  ngOnInit(): void {
    this.algoService.index().subscribe({
      next: (algorithm) => {
        this.algorithms = algorithm;
        this.algorithms.forEach(element => {
          this.loadSolutions(element.id);
        });
      },
      error:  (fail) => {
        console.error('Load Algorithm error' + fail)
      }
    });
    this.algorithms.forEach(
      (algorithm) => this.loadSolutions(algorithm.id));
  }

  loadSolutions(id: number){
    this.solService.index(id).subscribe(
      solution => this.solutions = solution,
      error => console.error('Load Solution error' + error)
    )
  }
}
