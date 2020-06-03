const express = require('express');
const app = express();
var path = require('path');
app.use(express.static(path.join(__dirname,'Front-End-Files/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/Pilot-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/Selection-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/Upgrade-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/Upgrade-Screen/Upgrade-Selection-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Add-New-Ship-Screens/Upgrade-Screen/Upgrade-Type-Selection-Screen/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/JS Data Classes/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/Pilot-Screen/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/Selection-Screen/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Remove-Ship-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Stats-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Upgrade-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Upgrade-Screen/View-Team-Upgrade-Selection-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Team-Screen/Team-Option-Screens/View-Team-Upgrade-Screen/View-Team-Upgrade-Type-Selection-Screen/')));





app.use(express.static(path.join(__dirname,'Front-End-Files/Title-Screen(Main Menu)/')));

app.use(express.static(path.join(__dirname,'Front-End-Files/Upgrade-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Upgrade-Screen/Upgrade-Selection-Screen/')));
app.use(express.static(path.join(__dirname,'Front-End-Files/Upgrade-Screen/upgrade-type-selection-screen/')));

// add other routes below
app.get('/', function (req, res) {
  console.log("we are here!");
  res.sendFile(path.join(__dirname , '/Front-End-Files/Title-Screen(Main Menu)/index.html'));
});

app.listen(process.env.PORT || 8080);