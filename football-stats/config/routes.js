var express = require('express');
var router = express.Router();

var HomeCtrl = require('../controllers/HomeCtrl');
var UserCtrl = require('../controllers/UserCtrl');
var ResourseCtrl = require('../controllers/ResourseCtrl');

router.get('/', HomeCtrl.renderHomePage);
router.get('/resourses/', UserCtrl.getResourse);
router.get('/matches', ResourseCtrl.getResourse);

module.exports = router;