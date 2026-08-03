const mongoose = require('mongoose')

const authModel =new mongoose.Schema({
    email: String,
    password: String,
    name:String,
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
},
{
    versionKey:false
}
)

module.exports = mongoose.model('Auth',authModel,'auths')