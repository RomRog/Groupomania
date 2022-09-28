const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

require("dotenv").config();

// appel des constantes des routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/post");


// éviter les erreurs de CORS
app.use(cors())


app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);


app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;