import { Component, OnInit } from '@angular/core';
import { DealService } from '../deal.service'
import { HistoryService } from '../history.service';

type Card = {
  suit?: String,
  value?: String,
  hasMatch?: boolean
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

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  dealt: boolean;
  hasHistory: boolean;
  percentage: String | undefined
  historicalPercentage: String | undefined
  configuration: Card[][] | undefined
  historical: Deck[] | undefined

  constructor(private dealService: DealService, private historyService: HistoryService) {
    this.dealt = false
    this.hasHistory = false;
  }

  ngOnInit(): void {
    this.dealt = false
    this.configuration = [
      Array(13).fill({}),
      Array(13).fill({}),
      Array(13).fill({}),
      Array(13).fill({}),
    ]

    const comp = this;

    // check for any historical decks in mongo on init (in case of refresh)
    this.historyService.getHistory()
    .toPromise()
    .then(({ decks }) => {
      comp.historical = decks
      comp.hasHistory = decks.length > 0
    })
  }

  // onClick is executed when the deal button is pressed
  // retrieves a new deck configuration and updates historical data
  onClick(): void {
    this.dealt = true
    const comp = this;

    this.dealService.getDeal()
      .toPromise()
      .then(({ config, percentage }) => {
        comp.configuration = config
        comp.percentage = `${percentage}%`

        comp.historyService.getHistory()
          .toPromise()
          .then(({ count, percentage, decks }) => {
            comp.historicalPercentage = `${percentage}%`
            comp.historical = decks
            comp.hasHistory = decks.length > 0
          })
      })


  }

}
