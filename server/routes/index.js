const router = require('express').Router()
const Deck = require('../utils/Deck')


router.get('/', (req, res, next) => {
	res.json({ msg: 'you hit the api' })
})

router.get('/deal', (req, res, next) => {
	const deck = new Deck()
	deck.shuffle

	const { config, percentage } = deck.deal()

	// store in mongo


	res.json({ config, percentage })
})

router.get('/history', (req, res, next) => {


	res.json({ msg: 'you hit the api' })
})


module.exports = router