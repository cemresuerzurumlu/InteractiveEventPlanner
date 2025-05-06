const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Statik dosyalar (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// API: Etkinlikleri oku
app.get("/api/events", (req, res) => {
  fs.readFile("server/events.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Server error");
    res.send(JSON.parse(data));
  });
});

// API: Yeni etkinlik ekle
app.post("/api/events", (req, res) => {
  const newEvent = req.body;

  fs.readFile("server/events.json", "utf8", (err, data) => {
    const events = JSON.parse(data);
    events.push(newEvent);

    fs.writeFile("server/events.json", JSON.stringify(events), err => {
      if (err) return res.status(500).send("Write error");
      res.status(201).send("Event added");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
