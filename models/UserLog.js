const {Schema, model, Types} = require('mongoose')


const userLogSchema = new Schema ({
    email: {type: String},
    date: { type: Date, default: Date.now }
})

module.exports = model('UserLog', userLogSchema) //user Log