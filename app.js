const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;
const API_URL = "https://dry-sierra-65221.herokuapp.com/api/activities";

app.use(express.json());

const trad = {
  barque: "boat",
  eau: "boat",
  cathédrale: "chrurch",
  cave: "champagne",
  champagne: "champagne",
  cinéma: "cinema",
  collégiale: "chrurch",
  culturel: "culture",
  enfant: "kid",
  guide: "guide",
  histoire: "historical",
  jard: "parc",
  jardin: "parc",
  parc: "parc",
  locaux: "local",
  local: "local",
  monument: "monument",
  église: "chrurch",
  batiment: "monument",
  nature: "parc",
  naturel: "parc",
  piscine: "pool",
  sport: "sport",
  jeux: "recreation",
  jouer: "recreation",
  musée: "museum",
  balader: "tour",
  promener: "tour",
  louer: "rent",
  location: "rent",
  film: "cinema"
};

// app.get("/", (req, res) => {
//   axios
//     .get(API_URL, {
//       params: {
//         tags: ["museum", "culture"]
//       }
//     })
//     .then(response => {
//       res.json(response.data);
//     })
//     .catch(error => console.log(error));
// });

app.post("/activities", (req, res) => {
  console.log(req.body);
  if (req.body.nlp.entities.activity) {
    //Search a specific activity
    axios
      .get(API_URL, {
        params: {
          name: req.body.nlp.entities.activity[0].value
        }
      })
      .then(response => {
        // res.json(response.data);
        res.json({
          replies: [
            {
              type: "card",
              content: {
                title: response.data[0].name,
                subtitle: "Test",
                imageUrl: "https://i.imgur.com/AqkJBm3.jpg",
                buttons: [
                  {
                    title: "Merci",
                    type: "BUTTON_TYPE",
                    value: "Merci"
                  }
                ]
              }
            }
          ]
        });
      })
      .catch(error => console.log(error));
  } else {
    //Search activities by specific theme
    const topics = req.body.nlp.entities.topic;
    let tags = [];
    for (let topic of topics) {
      tags.push(trad[topic.value]);
    }
    console.log(tags);
    axios
      .get(API_URL, {
        params: {
          tags
        }
      })
      .then(response => {
        res.json({
          replies: [
            {
              type: "card",
              content: {
                title: response.data[0].name,
                subtitle: "Test",
                imageUrl: "https://i.imgur.com/AqkJBm3.jpg",
                buttons: [
                  {
                    title: "Merci",
                    type: "BUTTON_TYPE",
                    value: "Merci"
                  }
                ]
              }
            }
          ]
        });
      })
      .catch();
  }
});

app.listen(process.env.PORT || port, () =>
  console.log(`Listening on port ${port}`)
);
