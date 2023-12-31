const express = require("express");

var membreController = require("../controllers/membreController");

var auth = require("../middlewars/auth");

exports.router = (function(){
    var membreRouter = express.Router(); 

    membreRouter.route("/register").post(membreController.register);

    membreRouter.route("/liste/").get(membreController.liste);

    membreRouter.route("/delete/:id").delete(membreController.deletemembre);

    membreRouter.route("/update/:userId").put(membreController.updatemembre);

    membreRouter.route("/one/").get(membreController.onemembre);

    membreRouter.route("/selectone/:id").get(membreController.Selectmembre);

    membreRouter.route("/recherches/:recherche").get(membreController.Recherche);



    return membreRouter;
})();