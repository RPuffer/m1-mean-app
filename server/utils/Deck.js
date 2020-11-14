
const suits = [ 'S', 'D', 'H', 'C' ]
const values = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K' ]

class Card {
	constructor(suit, value) {
		this.suit = suit
		this.value = value
		this.hasMatch = false
	}

	checkSuit(suit) {
		return this.suit === suit
	}
	checkValue(value) {
		return this.value === value
	}

	checkMatch(card) {
		this.hasMatch = this.hasMatch || card.value === this.value
	}

	reset() {
		this.hasMatch = false
	}
}

class Deck {
	constructor() {
		this.deck = []
		this.config = null

		suits.forEach( s => {
			values.forEach( v => {
				this.deck.push(new Card(s,v))
			})
		})
	}

	shuffle() {
		let n = this.deck.length

		while(n) {
			n--
			const i = Math.floor(Math.random() * n)

			const tmp = this.deck[n]
			tmp.reset()

			this.deck[n] = this.deck[i]
			this.deck[i] = tmp
		}
	}


	deal() {
		this.config = [[],[],[],[]]

		let correctlyOrdered = 0

		suits.forEach( (suit, row) => {
			values.forEach( (value, column) => {
				const currentCard = this.deck[((row + 1) * (column + 1)) - 1]

				// console.log(currentCard.hasMatch)

				if (row > 0) {
					// this.config[row -1][column] represents the card above the current card in the configuration
					currentCard.checkMatch(this.config[row -1][column])
					this.config[row -1][column].checkMatch(currentCard)
				}
				if (column > 0) {
					// this.config[row][column - 1] represents the card to the left of the current card in the configuration
					currentCard.checkMatch(this.config[row][column - 1])
					this.config[row][column - 1].checkMatch(currentCard)
				}

				// console.log(currentCard.hasMatch)


				this.config[row][column] = currentCard

				if(currentCard.checkSuit(suit)) correctlyOrdered++
				if(currentCard.checkValue(value)) correctlyOrdered++
			})
		})

		const percentage = ((correctlyOrdered / 104) * 100).toFixed(2)

		return {
			config: this.config,
			percentage
		}
	}
}

module.exports = Deck