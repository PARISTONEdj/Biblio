var Book = require("../models/book");

var auth = require("../middlewars/auth");

module.exports = {

    enregistrer : function(req, res, next){
        try {

            console.log(req.body);
            const { titre, auteur,  annee, ISBN } = req.body;
    
            const nouveaubook = new Book({
                titre,
                auteur,
                annee,
                ISBN
            });
    
            const bookEnregistree = nouveaubook.save();
    
            res.status(201).json({"id" :  bookEnregistree._id});
        } catch (erreur) {
            console.error("Erreur lors de l'enregistrement du livre :", erreur);
            res.status(500).json({ erreur: "Erreur lors de l'enregistrement du livre" });
        }
    },

    modifier : function(req, res, next){
        var id = req.params.id;
        console.log("le parametre est absolument : "+id);
  
        console.log(req.body);

            Book.findOne({_id : id})
            .then(function(bookfound){
              if(bookfound){
                Book.updateOne({_id : id}, {...req.body, _id : id})
                    .then(()=>res.status(200).json({"message" : "Book modifier"}))
                    .catch(function(err){
                      return res.status(500).json({"error" : "Mise a jour echouer"});
                    })
              }
              else{
                return res.status(500).json({"error" : "Book introuvable"});
              }
            })
            .catch(
              function(err){
                return res.status(500).json({ "error": "Book introuvable" });
              }
            )
        // }
        
        
    },

    suprimer : function(req, res, next){

        var id = req.params.id;
        console.log("l id est : "+id);
      if(id ==null){
        return res.status(400).json({"error" : "book nom trouver"})
      }
      else{
        Book.findOne({_id : id})
            .then(function(bookfound){
              if(bookfound){
                Book.deleteOne({_id : id})
                    .then(()=>res.status(200).json({"message" : "book supprimer"}))
                    .catch(function(err){
                      return res.status(500).json({"error" : "Echec suppression"})
                    })
              }
              else{
                return res.status(500).json({"error" : "book introuvable"});
              }
            })
            .catch(
              function(err){
                return res.status(500).json({ "error": "book introuvable" });
              }
            )
      }

    },

    consulter: function(req, res, next) {
        const Id = req.params.id;
        
        console.log(Id);
        if (!Id) {
            return res.status(400).json({ message: 'ID non fourni' });
        }
    
        Book
          .findById(Id)
          .then(book => {
            if (!book) {
              return res.status(404).json({ message: 'livre introuvable' });
            }
            res.status(200).json(book);
          })
          .catch(error => {
            console.error('Erreur lors de la recherche du livre :', error);
            res.status(500).json({ error: 'Erreur serveur' });
          });
    },

    liste : function(req, res, next){
        Book.find()
            .then(books => res.status(200).json(books))
            .catch(error => res.status(400).json({ error }));
    },

    listeselect : function(req, res, next){
        const userId = req.params.id;
        Book.find({userId : userId})
            .populate('userId', 'username email')
            .then(recettes => res.status(200).json(recettes))
            .catch(error => res.status(400).json({ error }));
    },

    maliste : function(req, res, next){
        const userId = req.auth.userId;
        Book.find({userId : userId})
            .populate('userId', 'username imageUrl')
            .then(recettes => res.status(200).json(recettes))
            .catch(error => res.status(400).json({ error }));
    },

    Recherche : async function(req, res, next){
        try {
            const termeRecherche = req.params.recherche;

            console.log("theme de recherche ", termeRecherche);

            const rechercheQuery = termeRecherche
                ? { title: { $regex: termeRecherche, $options: 'i' } }
                : {};
    
            const book = await Book.find(rechercheQuery).populate('userId', 'username');
    
            res.status(200).json(book);
        } catch (error) {
            console.error('Erreur de recherche :', error);
            res.status(500).json({ error: 'Erreur de recherche' });
        }
    },

    Recherche : async function(req, res, next){
      try {
          const termeRecherche = req.params.recherche;

          console.log("theme de recherche ", termeRecherche);
  
          const rechercheQuery = termeRecherche
              ? { titre: { $regex: termeRecherche, $options: 'i' } }
              : {};
  
          const books = await Book.find(rechercheQuery);
  
          res.status(200).json(books);
      } catch (error) {
          console.error('Erreur de recherche :', error);
          res.status(500).json({ error: 'Erreur de recherche' });
      }
  }
}