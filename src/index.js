//Adding dependencies
const express = require('express');
require('./db/mongo');
const path = require('path');
const userRouter = require('./routers/user');

const app = express();


const port = process.env.PORT || 3030;
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));
app.use(express.json());
app.use(userRouter);


app.listen(port , () => console.log('Server is up at ' + port));