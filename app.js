const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => console.log(`Server en écoute sur le port ${port}`));
