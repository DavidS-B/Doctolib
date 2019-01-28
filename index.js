const express = require("express");
const bodyParser = require("body-parser");
const dateFns = require("date-fns");
const uuidv1 = require("uuid/v1");
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

const newTab = [];

app.get("/visits", (req, res) => {
  if (dateFns.isPast(req.body.date) || dateFns.isSunday(req.body.date)) {
    return res.send({
      error: {
        message: "Wrong date"
      }
    });
  }
  availabilities[0].date = req.body.date;
  res.send(availabilities);
});

app.post("/visits", (req, res) => {
  if (dateFns.isPast(req.body.date) || dateFns.isSunday(req.body.date)) {
    return res.send({
      error: {
        message: "Wrong date"
      }
    });
  }
  if (newTab.length > 0) {
    for (let i = 0; i < newTab.length; i++) {
      if (
        newTab[i].date.includes(req.body.date) &&
        newTab[i].slot.includes(req.body.slot)
      ) {
        return res.send({
          error: {
            message: "Slot already booked"
          }
        });
      }
    }
    availabilities[0].date = req.body.date;
    key = uuidv1();
    availabilities[0].slots[req.body.slot].isAvailable = false;
    availabilities[0].slots[req.body.slot].name = req.body.name;
    newTab.push({
      date: availabilities[0].date,
      slot: req.body.slot,
      cancelKey: key
    });
    return res.send({
      message: `Successfuly booked, your key is: ${key}`
    });
  } else if (newTab.length === 0) {
    availabilities[0].date = req.body.date;
    key = uuidv1();
    availabilities[0].slots[req.body.slot].isAvailable = false;
    availabilities[0].slots[req.body.slot].name = req.body.name;
    newTab.push({
      date: availabilities[0].date,
      slot: req.body.slot,
      cancelKey: key
    });
    return res.send({
      message: `Successfuly booked, your key is: ${key}`
    });
  }
});

app.get("/cancel", (req, res) => {
  return res.send(newTab);
});

app.post("/cancel", (req, res) => {
  for (let i = 0; i < newTab.length; i++) {
    if (req.body.cancelKey === newTab[i].cancelKey) {
      availabilities[0].slots[newTab[i].slot].isAvailable = true;
      delete availabilities[0].slots[newTab[i].slot].name;
      delete newTab[i];
      return res.send({ message: "Successfuly canceled your booking" });
    }
  }
  return res.send({ message: "Wrong key" });
});

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Server started");
});
