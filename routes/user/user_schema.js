const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
    unique: true
  },
  father:{
    type: String,
    unique: true
  },
  dateOFJoin:{
    type: Date,
    unique: true
  },
  cnic:{
    type: String,
    unique: true
  },
  password: {
     type : String,
     unique: false,
   },
   religion: {
    type : String
  },
  phone: {
    type : String
  },
  fullAddress: {
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
  city: {
    type : String
  },
  occupation: {
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