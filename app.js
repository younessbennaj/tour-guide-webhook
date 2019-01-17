const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;
const API_URL = "https://9ddcd270.ngrok.io/api/activities";

app.get("/", (req, res) => {
  axios
    .get(API_URL, {
      params: {
        tags: ["museum", "culture"]
      }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => console.log(error));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);
