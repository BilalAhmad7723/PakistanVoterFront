const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  email:{
    type: String
  },
  password: {
     type : String
   },
   constituency:{
    type: String
  },
  voteFlag: {
    type : Boolean
  },
  voteTo: {
    type : String
  }
}, {
    collection: 'users',
    versionKey: false
  })

module.exports = mongoose.model('users', usersSchema)