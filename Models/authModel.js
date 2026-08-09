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
     // Profile information
    profilePic: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    postalCode: {
      type: String,
      default: "",
    },
},
{
    versionKey:false
}
)

module.exports = mongoose.model('Auth',authModel,'auths')
