const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let candidateSchema = new Schema({
  name: {
    type: String
  },
  fname:{
    type: String
  },
  email:{
    type: String
  },
  phone:{
    type: String
  },
  cnic: {
    type: String
  },
  edu: {
    type: String
  },
  count:{
    type: String
  },
  constituency:{
    type: String
  },
  votecast:{
    type: Boolean
  },
  status:{
    type: String
  },
  Image: 
    {
        data: Buffer,
        contentType: String
  },
  nominatedBy: {
    name : {type: String},
    email: {type:String}
  }
}, {
    collection: 'candidate',
    versionKey: false
  })

module.exports = mongoose.model('candidate', candidateSchema)