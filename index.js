const http = require('http');
const express = require('express');
var fs = require('fs');
const app = express();

let __dirname = "Front-End-Files"
app.use(express.static(path.join(__dirname)));
app.use("/", express.static(__dirname));

// add other routes below
app.get('/Front-End-Files', function (req, res) {
  res.sendFile(path.join(__dirname + 'Title-Screen(Main Menu)/index.html'));
});

app.listen(process.env.PORT || 8080);
