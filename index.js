const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

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
  availabilities[0].date = req.body.date;
  res.send(availabilities);
});

app.post("/visits", (req, res) => {
  availabilities[0].date = req.body.date;
  if (availabilities[0].slots[req.body.slot].isAvailable === true) {
    availabilities[0].slots[req.body.slot].isAvailable = false;
    availabilities[0].slots[req.body.slot].name = req.body.name;
    res.send({
      message: "Successfuly booked"
    });
  } else {
    res.send({
      error: {
        message: "Slot already booked"
      }
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server started");
});
