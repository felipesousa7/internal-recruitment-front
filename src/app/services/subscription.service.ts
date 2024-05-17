import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  findById(id: string): Observable<Subscription> {
    return this.http.get<Subscription>(`${API_CONFIG.baseUrl}/subscriptions/find/${id}`);
  }

  findAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${API_CONFIG.baseUrl}/subscriptions/list`);
  }

  create(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${API_CONFIG.baseUrl}/subscriptions/create`, subscription);
  }

  update(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${API_CONFIG.baseUrl}/subscriptions/update/${subscription.id}`, subscription);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/subscriptions/delete/${id}`);
  }
}
