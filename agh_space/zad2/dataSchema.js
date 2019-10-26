const mongoose = require('mongoose')
const uri = "mongodb+srv://test:test1@cluster0-zjll2.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri);


let DataSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,


  },
  data: {
    type: Array,
    required: true,


  },

},{collection:'test'})

module.exports = mongoose.model('data',DataSchema)
