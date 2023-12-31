const mongoose = require('mongoose');


const membreSchema = mongoose.Schema({
  email: { type: String, required: false, unique:true },
  username: { type: String, required: true },
  adresse: { type: String, required: false },
  telephone : {type : String, required : false},
  datecreation : {type : String, require : false},
});

membreSchema.index({ username: 'text' });

module.exports = mongoose.model('Membre', membreSchema);