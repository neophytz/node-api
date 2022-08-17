const express = require('express');
// import it using require.
// we use an already available framework that 
// will help us create our backend web server.

const app = express();
const PORT = 8080;

// -> /staff/all
app.use('/user', require('./src/routes/user_route'));
app.use('/staff', require('./src/routes/staff_route'));

app.listen(PORT, () => {
    console.log('server started');
});

