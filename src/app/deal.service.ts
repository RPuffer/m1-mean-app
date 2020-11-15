import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Card = {
  suit: String,
  value: String,
  hasMatch: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private http: HttpClient) { }

  getDeal(): Observable<{ config: Card[][], percentage: number }> {
    return this.http.get<{ config: Card[][], percentage: number }>('api/deal')
  }
}
