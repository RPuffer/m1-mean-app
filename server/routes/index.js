const router = require('express').Router()
const Deck = require('../utils/Deck')
const { Configuration, HistoricalPercentage } = require('../models')


router.get('/', (req, res, next) => {
	res.json({ msg: 'you hit the api' })
})


router.get('/deal', async (req, res) => {
	const deck = new Deck()
	deck.shuffle()

	const { config, percentage } = deck.deal()

	try {
		// store in mongo
		const mongoConfig = new Configuration({ config, percentage })
		await mongoConfig.save()

		res.json({ config, percentage })

	} catch (err) {
		res.status(500).json({
			msg: 'error saving configuration to mongo',
			err
		})
	}
})

router.get('/history', async (req, res) => {
	try {
		const historical = await HistoricalPercentage.findOne({})

		if (!historical) {
			res.json({ count: 0, percentage: 0, decks: [] })
		} else {
			const decks = await Configuration.find({}).sort('_id')

			res.json({ count: historical.count, percentage: historical.percentage, decks })
		}
	} catch (err) {
		res.status(500).json({
			msg: 'error saving configuration to mongo',
			err
		})
	}
})


module.exports = router