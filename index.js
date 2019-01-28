const express = require("express");
const app = express();

const availabilities = [
  {
    date: "",
    slots: {
      "1000": { isAvailable: true },
      "1030": { isAvailable: true },
      "1100": { isAvailable: true },
      "1130": { isAvailable: true },
      "1400": { isAvailable: true },
      "1430": { isAvailable: true },
      "1500": { isAvailable: true },
      "1530": { isAvailable: true },
      "1600": { isAvailable: true },
      "1630": { isAvailable: true },
      "1700": { isAvailable: true },
      "1730": { isAvailable: true }
    }
  }
];

app.get("/visits", (req, res) => {
  availabilities[0].date = req.query.date;
  res.send(availabilities);
});

app.listen(3000, () => {
  console.log("Server started");
});
