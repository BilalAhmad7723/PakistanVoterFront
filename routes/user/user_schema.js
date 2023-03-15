const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  password: {
     type : String
   },
   religion: {
    type : String
  },
  feeCollection: {
    type : String
  },
  RefMemberID:{
    type : String
  },
  gender: {
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