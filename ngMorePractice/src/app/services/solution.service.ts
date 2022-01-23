import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8083/';
  private url = this.baseUrl + 'api/';

  index(id: number): Observable<Solution[]> {
    console.log(id);
    let endPoints = `algorithms/${id}/solutions`;
    return this.http.get<Solution[]>(this.url + endPoints).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TrackerService.index() error'));
      })
    );
  }

  // show(sId: number): Observable<Solution> {
  //   // "algorithms/solutions/{sId}"
  //   let endPoints = `/algorithms/solutions/${sId}`;
  //   return this.http.get<Solution>(this.url + endPoints).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError(() => new Error('TodoService.show() error'));
  //     })
  //   );
  // }

}
