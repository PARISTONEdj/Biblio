var express = require('express'); 

const mongoose = require('mongoose');

const bodyParser = require("body-parser");

const membreRouter = require("./routes/membreRoutes").router;
const bookRouter = require("./routes/bookRoutes").router;
const empruntRouter = require("./routes/empruntRoutes").router;
const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get("/", (req, res) => {  
    res.send("hello biblio");
});

app.use("/membres/", membreRouter);

app.use("/books/", bookRouter);

app.use("/emprunt/", empruntRouter);
const port = 5000;

app.listen(port || 5000, () => console.log("Le serveur démarre"));

mongoose.connect('mongodb://127.0.0.1:27017/book')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

