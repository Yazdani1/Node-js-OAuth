const mongoose = require("mongoose");


var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,

  },

  googleId:{
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum : ['Admin','Subscriber'],
    default: 'Subscriber'
  },
  date: {
    type: Date,
    default: Date.now,
  },

});



module.exports = mongoose.model("User", userSchema);
