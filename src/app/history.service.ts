import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Card = {
  suit: String,
  value: String,
  hasMatch: boolean
}

type Deck = {
  config: Card[][],
  percentage: Number,
  _id: Number,
}

type History = {
  count: Number,
  percentage: Number,
  decks: Deck[]
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(): Observable<History> {
    return this.http.get<History>('api/history')
  }
}
