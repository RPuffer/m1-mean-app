
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

		for (const s of suits) {
			for (const v of values) {
				this.deck.push(new Card(s,v))
			}
		}
	}

	// based off modern Fisher-Yates shuffle algorithm
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
		let index = 0

		for (const [row, suit] of suits.entries()) {
			for (const [column, value] of values.entries()) {
				const currentCard = this.deck[index]
				index++

				// if it exists - check card above for match
				if (row > 0) {
					currentCard.checkMatch(this.config[row - 1][column])
					this.config[row - 1][column].checkMatch(currentCard)
				}
				// if it exists - check card to the left for match
				if (column > 0) {
					currentCard.checkMatch(this.config[row][column - 1])
					this.config[row][column - 1].checkMatch(currentCard)
				}
				// if it exists - check card to upper left for match
				if (row > 0 && column > 0) {
					currentCard.checkMatch(this.config[row - 1][column - 1])
					this.config[row - 1][column - 1].checkMatch(currentCard)
				}
				// if it exists - check card to upper right for match
				if (row > 0 && column < values.length - 1) {
					currentCard.checkMatch(this.config[row - 1][column + 1])
					this.config[row - 1][column + 1].checkMatch(currentCard)
				}

				this.config[row][column] = currentCard

				if(currentCard.checkSuit(suit)) correctlyOrdered += 1
				if(currentCard.checkValue(value)) correctlyOrdered += 1
			}
		}

		const percentage = ((correctlyOrdered / 104) * 100).toFixed(2)

		return {
			config: this.config,
			percentage
		}
	}
}

module.exports = Deck

// const d = new Deck()

// d.shuffle()

// const { config, percentage } = d.deal()

// console.log(JSON.stringify(percentage))
// console.log(config)