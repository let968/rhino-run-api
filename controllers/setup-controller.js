const scores = require('../models/skiModel');

module.exports = function(app){
    app.get('/api/setupScores',function(req,res){

        //seed db
        const starterScores = [
            {
                name: 'AAA',
                score: 10000,
                timeSpentTurningLeft: 100,
                timeSpentTurningRight: 0,
                jumps: 10,
                createdOn: new Date()
            },
            {
                name: 'CND',
                score: 1000,
                timeSpentTurningLeft: 10,
                timeSpentTurningRight: 0,
                jumps: 9,
                createdOn: new Date()
            },
            {
                name: 'OUY',
                score: 30000,
                timeSpentTurningLeft: 3500,
                timeSpentTurningRight: 2000,
                jumps: 120,
                createdOn: new Date()
            },
            {
                name: 'OUY',
                score: 50000,
                timeSpentTurningLeft: 6000,
                timeSpentTurningRight: 366,
                jumps: 500,
                createdOn: new Date()
            }
        ];

        scores.create(starterScores,function(err,results){
            if(err) throw err;

            res.send(results);
        })
    })
}