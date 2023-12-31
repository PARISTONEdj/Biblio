var mongoose = require("mongoose");

const book = mongoose.Schema({
   
    titre: {
        type: String,
        required: true,
      },
      auteur: {
        type: String,
        required: true,
      },

      annee: {
        type: String,
        required: true,
      },

      ISBN: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

      disponible : {type : Boolean, default : true },

})

book.index({ titre: 'text' });


module.exports = mongoose.model('Book', book);