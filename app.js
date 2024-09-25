const express = require ('express');
const path = require('path');
const app = express();

//partie middleware
const verification = function(req, res, next ) {
    const Day = new Date();
  const day = Day.getDay();
  const heure = Day.getHours();

  //la date et l'heure
  if (day >= 1 && day <= 5 && heure >= 9 && heure < 17) {
    next();
  } else {
    res.send("Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).");
  }
}

//engine pug
app.set('view engine', 'pug');
app.set('views', './views');

//css
app.use(express.static(path.join(__dirname, 'public')));


// utilisation middleware pour toutes routes
app.use(verification);

//page  Home  route
app.get('/', (req, res) => {
    res.render('home');
});

// page services route
app.get('/services', (req, res) => {
    res.render('services');
});

// Contact route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Server port 1013
app.listen(1013, (err) => {
  if (err) {
    console.log('Server not running');
  } else {
    console.log('Server is running on http://localhost:1013');
  }
});