const ideal_drivers = {
    _id: {
        picture: 'string',
        age: 'number',
        name: 'string',
        team: 'string',
        races: {
            name: { time: 'string', timeInMS: 'string'},
            // ...
        }
    }
}

const ideal_races = {
    race_name: [ // sorted by timeInMS
        'driver_id',
        // ...
    ],
    // ...
}