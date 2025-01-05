import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs';
import { Requestmodels } from '../Models/request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private apiUrl = environment.ApiURL;

  constructor(private http: HttpClient) { }


  // GET method
  getData(req: Requestmodels): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl + req.RequestUrl}`, { headers }).pipe(
      takeUntil(this.destroy$),
      map(response => {
        return response;
      })
    );
  }

  // POST method
  postData(req: Requestmodels): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl + req.RequestUrl}`, JSON.stringify(req.RequestObject), { headers }).pipe(
      takeUntil(this.destroy$),
      map(response => {
        return response;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
