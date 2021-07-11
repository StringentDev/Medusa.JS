var express = require('express') 
var router = express.Router() 

// define the home page route 
router.get('/', function (req, res) { 
	res.render('pages/index.html')
}) 

// define the documentation route 
router.get('/documentation', function (req, res) { 
	res.render('pages/documentation.html') 
}) 

module.exports = router