var express = require('express');
var router = express.Router();

var HomeCtrl = require('../controllers/HomeCtrl');
var UserCtrl = require('../controllers/UserCtrl');

var APICtrl = require('../controllers/APICtrl');


router.get('/ids', APICtrl.returnIDs.bind(APICtrl));
router.get('/matches/:matchID', APICtrl.returnMatchInfo.bind(APICtrl));

// router.post('/matches/:id', APICtrl.insertMatch);

router.get('/', HomeCtrl.renderHomePage);
router.get('/resourses/', UserCtrl.getResourse);

module.exports = router;