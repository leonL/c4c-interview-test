var express = require('express');
var router = express.Router();

var db = require('../data/db')

// API routes
router.get('/provinces', function(req, res, next) {
  res.json(db.provinces)
});

router.get('/cities/:province', function(req, res, next) {
  let cities = db.cities,
    provCities = cities.filter(c => {
      return c.Province.toLowerCase() === req.params.province.toLowerCase() ? true : false;
    });
  res.json(provCities);
});

router.get('/cities', function(req, res, next) {
  res.json(db.cities)
});

// /api/cities/:province

module.exports = router;
