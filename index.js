const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

// set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: 'this is stuff...'
    });
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));