const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    image: String
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model('User', userModel, 'users')