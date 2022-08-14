const express = require('express');
const app = express();
const port = 3000;
const  helper = require("./helpers/dbHelpers.js");

//connection with database server
const pg = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    }
});

//get all usable routs 
app.get('/', (req, res) => {
    let routes = [];
    app._router.stack.forEach(element => {
        if (element.name === "bound dispatch") {
            routes.push(element.route.path);
        }
    });
    res.send(routes);
});

//get Measurements from sensor
app.get('/getMeasurementsFromSensor', (req, res) => {
    pg('measurement').table("measurement").join("Sensors","measurement.sensorID","=","Sensors.UUID").then((data) => {
        res.send(data);
    });
});


//get all Sensors
app.get('/getSensors', (req, res) => {
    pg.select('*').from('Sensors').then((data) => {
        res.send(data);
    });
});

//instert a new Sensor 
app.get('/insertSensor/:name-:-measures', (req, res) => {
    let name = req.params.name;
    let measure = req.params.measures;

    pg('Sensors').insert({
            name: name,
            measures: measure,
         
        })
        .then(function (result) {
            res.json({
                success: true,
                message: 'ok'
            });
        });
});

//insert a new measurment
app.get('/insertMeasurment/:sensorID:-measuredValue:-datetime:-latitude:-longitude', (req, res) => {
    let sensorID = req.params.sensorID;
    let measuredValue = req.params.measuredValue;
    let datetime = req.params.datetime;
    let latitude = req.params.latitude;
    let longitude = req.params.longitude;
    let catCheck = parseInt(req.params.cat);
    pg('Sensors').insert({
        sensorID: sensorID,
        measuredValue: measuredValue,
        datetime: datetime,
        latitude: latitude,
        longitude:longitude,
    })
    .then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});

//delete on Sensor ID
app.get('/deleteOnID/:UUID', (req, res) => {
    let Id = req.params.UUID;
    pg('Sensor').where('UUID', Id).del().then(function (result) {
        res.json({
            success: true,
            message: 'ok'
        });
    });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//creating the tables 
helper.createTables(pg);