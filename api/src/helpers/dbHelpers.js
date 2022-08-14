
//creating the needed tables 
async function createTables(pg) {
    pg.schema.hasTable('Sensors').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('Sensors', function (t) {
                t.increments('UUID').primary();
                t.string('name', 100);
                t.string('measures', 100);
                t.date('created_at');
                t.date('updated_at');
            });
        } else {
            console.log("table sensors exists!");
        }
    });
    pg.schema.hasTable('Measurments').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('Measuurments', function (t) {
                t.increments('UUID').primary();
                t.increments('SensorID').primary();
                t.float('measuredValue', 100);
                t.date('datetime')
                t.float('latitude', 100);
                t.float('longitude', 100);
                
            });
        } else {
            console.log("table Measurments exists!");
        }
    });
}

//exporting the function 
module.exports = { createTables };






