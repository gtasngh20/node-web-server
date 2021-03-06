const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n' , (err) => {
		if(err){
			console.log('Unable to append in server.log')
		}
	});
	next();
});

hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear()
});

// app.use((req,res) => {
// 	res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/'));

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// app.get('/',(req, res) => {
// 	//res.send('<h1>Hello Express</h>');
// 	res.send({
// 		name: 'Geet',
// 		likes: [
// 		'smrg',
// 		'ruiy'
// 		]
// 	});
// });

app.get('/',(req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about',(req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects',(req,res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page'
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port,() => {
	console.log(`Server is up on port ${port}`);
});