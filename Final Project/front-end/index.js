const express = require('express');
const app = express();
var path = require('path');
app.use(express.static(path.join(__dirname,'Front-End-Files/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Title-Screen(Main Menu)/')));

// add other routes below
app.get('/', function (req, res) {
  console.log("we are here!");
  res.sendFile(path.join(__dirname , '/Front-End-Files/Title-Screen(Main Menu)/index.html'));
});

app.listen(process.env.PORT || 8080);