var Membre = require("../models/membre");

var bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

const auth = require("../middlewars/auth");

module.exports = {

    register : function(req, res, next){
      try {
        var email = req.body.email;
        var adresse = req.body.adresse;
        var username = req.body.username;
        var telephone = req.body.adresse
        console.log("email", email);
        console.log("adresse", adresse); 

        const nouveaumembre = new Membre({
          email,
          username,
          telephone,
          adresse,
          
      });
      const membreEnregistree = nouveaumembre.save();

      res.status(201).json({"id" :  membreEnregistree._id});
  } catch (erreur) {
      console.error("Erreur lors de l'enregistrement du membre :", erreur);
      res.status(500).json({ erreur: "Erreur lors de l'enregistrement du membre" });
  }
    },

   

  liste : function(req, res, next){
    Membre.find()
    .then(membres => res.status(200).json(membres))
    .catch(error => res.status(400).json({ error }));
  },


  updatemembre : function(req, res, next){
    var id = req.params.userId;
    console.log("le parametre est : "+id);

    console.log(req.body.telephone);
    console.log(req.body);

    Membre.findOne({_id : id})
        .then(function(membrefound){
          if(membrefound){
            Membre.updateOne({_id : id}, {...req.body, _id : id})
                .then(()=>res.status(200).json({"message" : "membre modifier"}))
                .catch(function(err){
                  return res.status(500).json({"error" : "Mise a jour echouer"});
                })
          }
          else{
            return res.status(500).json({"error" : "membre introuvable"});
          }
        })
        .catch(
          function(err){
            return res.status(500).json({ "error": "membre introuvable" });
          }
        )
    

  },

  deletemembre : function(req, res, next){
    var id = req.params.id;
    if(id ==null){
      return res.status(400).json({"error" : "id nom trouver"})
    }
    else{
      Membre.findOne({_id : id})
          .then(function(membrefound){
            if(membrefound){
              Membre.deleteOne({_id : id})
                  .then(()=>res.status(200).json({"message" : "membre supprimer"}))
                  .catch(function(err){
                    return res.status(500).json({"error" : "Echec suppression"})
                  })
            }
            else{
              return res.status(500).json({"error" : "membre introuvable"});
            }
          })
          .catch(
            function(err){
              return res.status(500).json({ "error": "membre  introuvable" });
            }
          )
    }
  },

  onemembre: function(req, res, next) {
    const userId = req.auth.userId;
    
    Membre
      .findById(userId) 
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'membre non trouvé' });
        }
        res.status(200).json(user);
      })
      .catch(error => {
        console.error('Erreur lors de la recherche du membre  :', error);
        res.status(500).json({ error: 'Erreur serveur' });
      });
  },

  

  Selectmembre : function(req, res, next) {
    const userId = req.params.id;
    
    Membre
      .findById(userId) 
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'membre  non trouvé' });
        }
        res.status(200).json(user);
      })
      .catch(error => {
        console.error('Erreur lors de la recherche du membre  :', error);
        res.status(500).json({ error: 'Erreur serveur' });
      });
  },

  logout : function(req, res, rest){
    res.clearCookie('token'); 
    res.status(200).json({ message: "Déconnexion réussie" });
  },

  Recherche : async function(req, res, next){
    try {
        const termeRecherche = req.params.recherche;

        console.log("theme de recherche ", termeRecherche);

        const rechercheQuery = termeRecherche
            ? { username: { $regex: termeRecherche, $options: 'i' } }
            : {};

        const membres = await Membre.find(rechercheQuery);

        res.status(200).json(membres);
    } catch (error) {
        console.error('Erreur de recherche :', error);
        res.status(500).json({ error: 'Erreur de recherche' });
    }
}
}