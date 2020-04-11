const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/college-user', {
    useNewUrlParser : true,
    usecreateIndex : true,
    unifiedTopology : true
})