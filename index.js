// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date;

  if(!isNaN(date)) { //User input is a string, not a number. Case 1.
    date = parseInt(date); // * 1000;
    // console.log(parseInt(date)); // * 1000);
  } else {
    // console.log("not number");
    if ( isNaN(Date.parse(date)) ) {
      res.json({error : "Invalid Date"});
    }
  }

  let unix = new Date(date).getTime(); //Converts user_input to a Unix timestamp.
  let utc = new Date(date).toUTCString(); //Converts user_input to a UTC timestamp.
  
  res.json({
    unix: unix,
    utc: utc
  });
});

app.get("/api", function (req, res) {
  let unix = new Date().getTime(); //Converts user_input to a Unix timestamp.
  let utc = new Date().toUTCString(); //Converts user_input to a UTC timestamp.
  
  res.json({
    unix: unix,
    utc: utc
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
