const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// purpose will be explained later
app.use(bodyParser.json())

// purpose will be explained later
app.use(cors());

app.get('/', (req, res) => {
    return res.send('hello from backend API');
})

app.get('/students', (req, res) => {
    console.log(req);
    return res.send('oh! hey students');
})

app.get('/weather', (req, res) => {
    return res.json(
        {
            "coord": {
                "lon": -0.1257,
                "lat": 51.5085
            },
            "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
            ],
            "base": "stations",
            "main": {
            "temp": 27.94,
            "feels_like": 27.15,
            "temp_min": 25.58,
            "temp_max": 28.86,
            "pressure": 1002,
            "humidity": 32
            },
            "visibility": 10000,
            "wind": {
            "speed": 2.06,
            "deg": 250
            },
            "clouds": {
            "all": 100
            },
            "dt": 1660580737,
            "sys": {
            "type": 1,
            "id": 1414,
            "country": "GB",
            "sunrise": 1660538751,
            "sunset": 1660591466
            },
            "timezone": 3600,
            "id": 2643743,
            "name": "London",
            "cod": 200
        }
    )
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

