import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Algorithm } from '../models/algorithm';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8083/';
  // private url = this.baseUrl + 'api/';
  private url = environment.baseUrl + 'api/';

  index() {
    let endPoints = 'algorithms'
    return this.http.get<Algorithm[]>(this.url + endPoints).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('AlgorithmService.index() error'));
      })
    );
  }

  show(id: number): Observable<Algorithm> {
    // "algorithms/find/{id}"
    console.log(id);
    let endPoints = `algorithms/find/${id}`
    return this.http.get<Algorithm>(this.url + endPoints).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('AlgorithmService.show() error'));
      })
    );
  }
}
