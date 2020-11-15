import { Component, OnInit } from '@angular/core';
import { DealService } from '../deal.service'

type Card = {
  suit?: String,
  value?: String,
  hasMatch?: boolean
}

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  dealt: boolean;
  percentage: number | undefined
  configuration: Card[][] | undefined

  constructor(private dealService: DealService) {
    this.dealt = false
  }

  ngOnInit(): void {
    this.dealt = false
    this.configuration = [[{}],[{}],[{}],[{}]]
  }

  onClick(): void {
    this.dealt = true
    const comp = this;

    this.dealService.getDeal()
      .toPromise()
      .then(({ config, percentage }) => {
        console.log(config)
        comp.configuration = config
        comp.percentage = percentage
      })
  }

}
