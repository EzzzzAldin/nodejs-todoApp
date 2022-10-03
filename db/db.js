const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => console.log('DataBase is connected'));

module.exports = db;