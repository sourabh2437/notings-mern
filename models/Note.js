var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  titleValue: String,
  textValue:[],
  titleHtml:"",
  textHtml:"",
  creation_date: { type: Date },
  created_by: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);
