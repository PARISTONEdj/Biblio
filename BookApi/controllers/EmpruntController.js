
var Emprunt = require("../models/Emprunt");
var Membre = require("../models/membre");
var Book = require("../models/book");

module.exports = {
    Ajouter: async function (req, res, next) {
        try {
            const { membre, livre, dateRetourPrevue } = req.body;
    
            const currentDate = new Date();
            const selectedDate = new Date(dateRetourPrevue);
    
            if (selectedDate < currentDate) {
                return res.status(400).json({ erreur: "La date de retour prévue ne peut pas être antérieure à la date actuelle" });
            }
    
            const membreId = await Membre.findOne({ username: membre }).select('_id');
            const livreId = await Book.findOne({ titre: livre }).select('_id');
    
            const nouvelemprunt = new Emprunt({
                membre: membreId,
                livre: livreId,
                dateRetourPrevue,
            });
    
            const empruntEnregistree = await nouvelemprunt.save();
    
            await Book.updateOne({ _id: livreId }, { disponible: false });
    
            res.status(201).json({ id: empruntEnregistree._id });
        } catch (erreur) {
            console.error("Erreur lors de l'enregistrement de l'emprunt :", erreur);
            res.status(500).json({ erreur: "Erreur lors de l'enregistrement de l'emprunt" });
        }
    },

    liste : function(req, res, next){
        Emprunt.find()
        .populate("livre", "titre disponible")
        .populate("membre", "username")
        .then(emprunts => res.status(200).json(emprunts))
        .catch(error => res.status(400).json({ error }));
      },

      nonRendu: function (req, res, next) {
        Emprunt.find({ dateRetourEffective: null }) 
            .populate("livre", "titre")
            .populate("membre", "username")
            .then(emprunts => res.status(200).json(emprunts))
            .catch(error => res.status(400).json({ error }));
    }, 
    
    listeLivresEnRetard: function (req, res, next) {
        const currentDate = new Date();

        Emprunt.find({
            dateRetourEffective: null, 
            dateRetourPrevue: { $lt: currentDate } 
        })
            .populate("livre", "titre")
            .populate("membre", "username")
            .then(emprunts => res.status(200).json(emprunts))
            .catch(error => res.status(400).json({ error }));
    },

    rendreLivre : async function(req, res, next){
        const idEmprunt = req.params.id;
        try {
          const emprunt = await Emprunt.findById(idEmprunt);
      
          if (!emprunt) {
            return { erreur: 'Emprunt non trouvé' };
          }
      
          if (emprunt.dateRetourEffective) {
            return { erreur: 'Le livre a déjà été rendu' };
          }
      
          emprunt.dateRetourEffective = new Date();
          await emprunt.save();
      
          const livre = await Book.findById(emprunt.livre);
      
          if (livre) {
            livre.disponible = true;
            await livre.save();
          }
      
          return { message: 'Livre rendu avec succès' };
        } catch (erreur) {
          console.error('Erreur lors de la rendu du livre :', erreur);
          return { erreur: 'Erreur lors de la rendu du livre' };
        }
      },

      RechercheEmprunt: async function(req, res, next){
        try {
          const termeRecherche = req.params.recherche;
      
          console.log("Terme de recherche :", termeRecherche);
      
          const rechercheQuery = termeRecherche
            ? { $or: [
                { 'membre.username': { $regex: termeRecherche, $options: 'i' } },
                { 'livre.titre': { $regex: termeRecherche, $options: 'i' } }
              ]}
            : {};
      
          const emprunts = await Emprunt.find(rechercheQuery)
            .populate("membre", "username")
            .populate("livre", "titre disponible");
      
          res.status(200).json(emprunts);
        } catch (error) {
          console.error('Erreur de recherche des emprunts :', error);
          res.status(500).json({ error: 'Erreur de recherche des emprunts' });
        }
      }
}