var express = require('express');
var router = express.Router();

var HomeCtrl = require('../controllers/HomeCtrl');
var UserCtrl = require('../controllers/UserCtrl');

var APICtrl = require('../controllers/APICtrl');
var MatchCtrl = require('../controllers/MatchCtrl');


router.post('/matches/', MatchCtrl.insertMatch);

router.get('/ids', APICtrl.returnIDs.bind(APICtrl));
router.get('/matches/:matchID', APICtrl.returnMatchInfo.bind(APICtrl));

router.get('/', HomeCtrl.renderHomePage);
router.get('/resourses/', UserCtrl.getResourse);

module.exports = router;