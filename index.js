const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');


// Publishable API KEY pk_622b8a84b58d40098bf04ac11ac4c285

// user body parder with express
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Create Call API function
const callApi = (finishedAPI, ticker) => {request(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_622b8a84b58d40098bf04ac11ac4c285`, {json: true}, 
    (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        if (res.statusCode === 200) {
            finishedAPI(body);
        }
    });
};

// set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebar GET routes
app.get('/', function (req, res) {
    callApi(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "nio");
});

// Set handlebar POST routes
app.post('/', function (req, res) {
    callApi(function(doneAPI) {
        posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
            posted_stuff: posted_stuff
        });
    }, req.body.stock_ticker);
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));