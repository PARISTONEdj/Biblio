const express = require("express");

var empruntController = require("../controllers/EmpruntController");


exports.router = (function(){
    var empruntRouter = express.Router(); 

    empruntRouter.route("/ajouter").post(empruntController.Ajouter);

    empruntRouter.route("/liste/").get(empruntController.liste);

    empruntRouter.route("/listenonrendu/").get(empruntController.nonRendu);

    empruntRouter.route("/penalite/").get(empruntController.listeLivresEnRetard);

    empruntRouter.route("/update/:id").put(empruntController.rendreLivre);

    empruntRouter.route("/recherches/:recherche").get(empruntController.RechercheEmprunt);


    return empruntRouter;
})();