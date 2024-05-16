import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  findById(id: string): Observable<Job> {
    return this.http.get<Job>(`${API_CONFIG.baseUrl}/jobs/find/${id}`);
  }

  findAll(): Observable<Job[]> {
    return this.http.get<Job[]>(`${API_CONFIG.baseUrl}/jobs/list`);
  }

  create(job: Job): Observable<Job> {
    return this.http.post<Job>(`${API_CONFIG.baseUrl}/jobs/create`, job);
  }

  update(job: Job): Observable<Job> {
    return this.http.put<Job>(`${API_CONFIG.baseUrl}/jobs/update/${job.id}`, job);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/jobs/delete/${id}`);
  }
}
