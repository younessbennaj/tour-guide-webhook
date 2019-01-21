const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;
const API_URL = "https://dry-sierra-65221.herokuapp.com/api/activities";

app.use(express.json());

const trad = {
  barque: "boat",
  eau: "boat",
  cathédrale: "church",
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
  église: "church",
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

const emojis = {
  boat: "🚣",
  tour: "🚶",
  gastronomy: "🥘",
  champagne: "🥂",
  parc: "🌳",
  monument: "🏛️",
  church: "⛪",
  culture: "🎭",
  historical: "🕰️",
  museum: "📚",
  recreation: "🤹",
  rent: "💶",
  sport: "🏃",
  cinema: "🎬",
  pool: "🏊"
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
  if (req.body.conversation.memory.activity) {
    const { activity } = req.body.conversation.memory;
    //Search a specific activity
    axios
      .get(API_URL, {
        params: {
          name: activity.value
        }
      })
      .then(response => {
        const { name, description, url, tags } = response.data[0];
        let emojiString = "";
        for (let tag of tags) {
          emojiString += emojis[tag];
        }
        res.json({
          replies: [
            {
              type: "text",
              delay: 2,
              content: `${name} ${emojiString}`
            },
            {
              type: "picture",
              content: "https://i.imgur.com/AqkJBm3.jpg"
            },
            {
              type: "buttons",
              content: {
                title: description,
                buttons: [
                  {
                    title: "En savoir plus 👉",
                    type: "web_url",
                    value: url
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
    axios
      .get(API_URL, {
        params: {
          tags
        }
      })
      .then(response => {
        let content = [];
        for (let activity of response.data) {
          let obj = {
            title: activity.name,
            subtitle: "SUBTITLE",
            imageUrl: "https://i.imgur.com/AqkJBm3.jpg",
            buttons: [
              {
                title: "En savoir plus 👉",
                type: "postback",
                value: `Je veux visiter ${activity.name}`
              }
            ]
          };
          content.push(obj);
        }
        res.json({
          replies: [
            {
              type: "carousel",
              content: content
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
