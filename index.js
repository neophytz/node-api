// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // purpose will be explained later
// app.use(bodyParser.json())

// // purpose will be explained later
// app.use(cors());

// app.get('/', (req, res) => {
//     return res.send('hello from backend API');
// })

// app.post('/', (req, res) => {
//     return res.json({
//         user:'sachin',
//         password: 'why??'
//     })
// })

// app.get('/students', (req, res) => {
//     console.log(req);
//     return res.send('oh! hey students');
// })


// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`server started on localhost:${PORT}`));



const express = require('express');
// import it using require.
// we use an already available framework that 
// will help us create our backend web server.

const app = express();
const PORT = 8080;

app.get('/', (request, response) => {
    // some work!! some processing!!
    return response.json({
        status: 'ok',
        message: 'server is working fine'
    })
})

app.listen(PORT, () => {
    console.log('server started');
});

