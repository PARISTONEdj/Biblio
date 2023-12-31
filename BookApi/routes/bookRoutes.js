const express = require("express");

var bookController = require("../controllers/bookController");

var auth = require("../middlewars/auth");

exports.router = (function(){
    var bookRouter = express.Router(); 

    bookRouter.route("/enregistrer").post(bookController.enregistrer);


    bookRouter.route("/liste/").get(bookController.liste);

    bookRouter.route("/delete/:id").delete(bookController.suprimer);

    bookRouter.route("/update/:id").put(bookController.modifier);

    bookRouter.route("/selectone/:id").get(bookController.consulter);

    bookRouter.route("/recherches/:recherche").get(bookController.Recherche);


    return bookRouter;
})();