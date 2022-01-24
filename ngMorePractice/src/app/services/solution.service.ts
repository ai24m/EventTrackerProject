import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8083/';
  // private url = this.baseUrl + 'api/';
  private url = environment.baseUrl + 'api/';


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
}
