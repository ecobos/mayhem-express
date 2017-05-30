var express = require('express');
var reqPromise = require('request-promise');
var moment = require('moment');
var router = express.Router();
let googleCalApiKey = process.env.GOOGLE_CAL_KEY;
let googleCalId = process.env.GOOGLE_CAL_ID;
let datetime_Now = new Date().toJSON();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/minutes', function (req, res, next) {
  res.render('minutes');
});

router.get('/minutes/:year/:month/:day', function (req, res, next) {
  res.render('minutes');
});

router.get('/events', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  reqPromise('https://www.googleapis.com/calendar/v3/calendars/' + googleCalId + '/events?maxResults=10&timeMin=' + datetime_Now + '&orderBy=startTime&singleEvents=true&key=' + googleCalApiKey)
    .then(callResult => {
      let FIRST_EVENT = 0;
      var jsonResult = JSON.parse(callResult);
      //console.log(JSON.stringify(jsonResult));

      let nextEventStart = moment(jsonResult.items[FIRST_EVENT].start.dateTime);
      let nextEventEnd = moment(jsonResult.items[FIRST_EVENT].end.dateTime);

      var formated_events = jsonResult.items.map(event => {
        let origin_start = moment(event.start.dateTime);
        event.start = { dateFormatShort: origin_start.format("dddd, MMMM Do"), time: origin_start.format("h:mma") };
        return event;
      });
    
      /**  Format only the first element (next event) */
      
      console.log(nextEventStart);
      formated_events[FIRST_EVENT].start = {
        dateMonth: nextEventStart.format("MMMM"),
        dateDayNumber: nextEventStart.format("DD"),
        dateDay: nextEventStart.format("dddd"),
        time: nextEventStart.format("h:mma")
      };
      
      formated_events[FIRST_EVENT].end.time = nextEventEnd.format("h:mma");

      res.status(200).send(JSON.stringify({ events: formated_events }));
    })
    .catch(err => { res.status(400).send("Error contacting Google Calendar API: " + err); })
});

module.exports = router;
