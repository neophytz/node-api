const express = require('express');
const bodyParser = require('body-parser');
// import it using require.
// we use an already available framework that 
// will help us create our backend web server.

const app = express();
const PORT = 8080;


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

app.listen(PORT, () => {
    console.log('server started');
});

