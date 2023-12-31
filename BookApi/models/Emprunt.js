const mongoose = require('mongoose');

const empruntSchema = mongoose.Schema({
  membre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membre',
    required: true,
  },
  livre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  dateEmprunt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateRetourPrevue: {
    type: Date,
    required: true,
  },
  dateRetourEffective: {
    type: Date,
    required: false,
  },
  
});

empruntSchema.index({ livre: 'text' });
empruntSchema.index({ membre: 'text' });


module.exports = mongoose.model('Emprunt', empruntSchema);