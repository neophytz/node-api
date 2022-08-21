// always in the first line of the app.
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// import it using require.
// we use an already available framework that 
// will help us create our backend web server.

const app = express();
const PORT = process.env.PORT || 8080;

// if you want to use req.body then do this!!
app.use(bodyParser.json());

// -> /staff/all
app.use('/user', require('./src/routes/user_route')); 
// drinks -
/**
 * soft drinks
 * hard drinks
 * cocktails
 * mocktails
 * water
 * chai 
 * coffee
 */
app.use('/staff', require('./src/routes/staff_route'));
app.use('/org', require('./src/routes/organization_route'));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

const DB_URI = process.env.DB_URI;
mongoose.Promise = global.Promise;

const _option = {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
};

mongoose.connect(DB_URI, _option).then(()=> console.log(`DB connected`)).catch(err=> {
    console.error(err);
    // optional things - if you want you can also terminate the server
    process.exit(1); // 1 means some error has occurred.
});

