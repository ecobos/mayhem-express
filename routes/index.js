var express = require('express');
var reqPromise = require('request-promise');
var moment = require('moment');
var router = express.Router();
var googleCalApiKey = 'AIzaSyCCYVAJfxTocPvk8UDy45dNZ2yfcyKi4j8';

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

router.get('/events', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  reqPromise('https://www.googleapis.com/calendar/v3/calendars/mayhemrfc.com_cv7q89eqgdpjaq1sqpv06n6chs%40group.calendar.google.com/events?maxResults=10&key=' + googleCalApiKey)
    .then(callResult => {
      var jsonResult = JSON.parse(callResult);

      /**  Format only the first element, aka the next event*/
      var next = moment(jsonResult.items[0].start.dateTime);
      jsonResult.items[0].start.dateMonth = next.format("MMMM");
      jsonResult.items[0].start.dateDayNumber = next.format("DD");
      jsonResult.items[0].start.dateDay = next.format("dddd");
      jsonResult.items[0].start.time = next.format("h:mma");

      var nextEnd = moment(jsonResult.items[0].end.dateTime);
      jsonResult.items[0].end.time = nextEnd.format("h:mma");

      var itemCount = jsonResult.items.length; 
      for(var i = 1; i < itemCount; i++){
          var start = moment(jsonResult.items[i].start.dateTime);
          jsonResult.items[i].start.dateFormatShort = start.format("dddd, MMMM Do");
          jsonResult.items[i].start.time = start.format("h:mma");
      }
      res.status(200).send(JSON.stringify(jsonResult)); 
    })
    .catch(err => { res.status(400).send("Error contacting Google Calendar API: "+ err); })
});

module.exports = router;
