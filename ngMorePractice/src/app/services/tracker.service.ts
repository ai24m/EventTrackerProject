import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tracker } from '../models/tracker';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  private baseUrl = 'http://localhost:8083/';
  // private url = this.baseUrl + 'api/';
  private url = environment.baseUrl + 'api/';


  index(id: number): Observable<Tracker[]> {
    console.log(id);
    let endPoints = `algorithms/${id}/trackers`;
    return this.http.get<Tracker[]>(this.url + endPoints, ).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TrackerService.index() error'));
      })
    );
  }

  show(tId: number): Observable<Tracker> {
    // /algorithms/trackers/{tId}
    let endPoints = `/algorithms/trackers/${tId}`;
    return this.http.get<Tracker>(this.url + endPoints).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TodoService.show() error'));
      })
    );
  }


  create(tracker: Tracker, userId: number, id: number): Observable<Tracker> {
    let endPoints = `users/${userId}/algorithms/${id}/trackers`;
    return this.http.post<Tracker>(this.url + endPoints, tracker).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => ('Create error' + err));
      })
    );
  }

  update(tracker: Tracker, userId: number, id: number, tId: number): Observable<Tracker> {
    let endpoints = `users/${userId}/algorithms/${id}/trackers/${tId}`;
    if (tracker.completed) {
      let tempDate = this.datePipe.transform(Date.now(), 'shortDate');
      if (tracker.updatedAt === null) {
        tracker.updatedAt === '';
      } else {
      tracker.updatedAt === tempDate;
      }
    }
    return this.http.put<Tracker>(this.url + endpoints, tracker).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error ('Update error'));
      })
    );
  }

  destroy(userId: number, id: number, tId: number) {
    let endpoints = `users/${userId}/algorithms/${id}/trackers/${tId}`;
    return this.http.delete<Tracker>(this.url + endpoints).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error( 'Destroy Service error'));
      })
    );
  }
}
