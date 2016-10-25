var express = require('express');
var router = express.Router();

var HomeCtrl = require('../controllers/HomeCtrl');
var UserCtrl = require('../controllers/UserCtrl');

router.get('/', HomeCtrl.renderHomePage);
router.get('/resourses/', UserCtrl.getResourse);

module.exports = router;