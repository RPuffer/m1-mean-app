const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const dbUrl = process.env.NODE_APP_INSTANCE === 'dev'
	? 'mongodb://localhost:27017/test'
	: 'mongodb://mongo:27017/test'

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

const HistoricalPercentage = mongoose.model('HistoricalPercentage', new mongoose.Schema({
	count: Number,
	percentage: Number
}))

const CardSchema = new mongoose.Schema({ suit: String, value: String, hasMatch: Boolean }, { _id: false })

const ConfigurationSchema = new mongoose.Schema({
	_id: Number,
	config: {
		type: [[CardSchema], [CardSchema], [CardSchema], [CardSchema]],
		required: true,
	},
	percentage: {
		type: Number,
		required: true
	}
}, { _id: false })

ConfigurationSchema.plugin(AutoIncrement);


ConfigurationSchema.post('save', async (doc, next) => {
	try {
		let historical = await HistoricalPercentage.findOne()

		if (!historical) {
			historical = new HistoricalPercentage({
				count: 1,
				percentage: doc.percentage
			})
			await historical.save()
		} else {
			const { count, percentage } = historical

			historical.count = count + 1
			historical.percentage = (((percentage * count) + doc.percentage) / (count + 1)).toFixed(2)

			await historical.save()
		}
	} catch (err) {
		console.log('error updating historical percentage')
	} finally {
		next()
	}
});


module.exports = {
	Configuration: mongoose.model('Configuration', ConfigurationSchema),
	HistoricalPercentage,
}