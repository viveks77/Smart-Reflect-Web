//Adding dependencies
const express = require('express');
const bodyparser = require('body-parser');
const hbs = require('hbs');
const coookieparser = require('cookie-parser');
require('./db/mongo');
const path = require('path');
const userRouter = require('./routers/user');

const app = express();


const port = process.env.PORT || 3030;
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '/templates/view');
const partialsPath = path.join(__dirname, '/templates/partials')

app.use(express.static(publicDirPath));
app.use(bodyparser.urlencoded({extended : true}));
app.use(coookieparser());
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
    res.sendFile(publicDirPath + '/landing.html');
})

app.listen(port , () => console.log('Server is up at ' + port));