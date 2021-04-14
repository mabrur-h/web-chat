const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/instagram";

async function client() {
    const options = {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return await mongoose.connect(url, options);
}

module.exports = client
