var express = require("express");
var helmet = require("helmet");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var compression = require('compression');

var route__main = require("./routes/route.main.js");

var app = express(); 

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'))
app.use("/", route__main)
app.use(helmet());

app.disable('x-powered-by');

app.set('view engine', 'html');
app.set('trust proxy', true);

app.use(compression())
app.use("/public", express.static('public'))
app.use("/documentation", express.static('documentation'))
app.set('etag', true)
app.use(cookieParser())
//Strict-Transport-Security: max-age=31536000; includeSubDomains
app.set('Cache-Control', 'public, max-age=31557600')
app.set('Strict-Transport-Security', 'max-age=10886400; includeSubDomains')

app.use(async (req, res, next) => {
	res.status(404).render('errors/404.html')
});

app.use(async (err, req, res, next) => {
	url = req.originalUrl
	console.log(url, err.message)
	if(err.message.includes('Failed to lookup view')){
		res.status(404).render('errors/404.html', { page : url })
	} else {
		res.status(500).render('errors/500.html', { page : url})
	}
})

app.listen(3000, () => {
  console.log(`All is ready`)
})