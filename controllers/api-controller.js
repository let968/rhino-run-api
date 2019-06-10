const Scores = require('../models/skiModel');
const bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/scores',function(req,res){
        Scores.find().limit(20).sort('-score').exec(function(err,scores){
            if(err) throw err;

            res.send(scores);
        })
    });

    app.get('/api/scores/:uname',function(req,res){
        Scores.find({ name: req.params.uname },function(err,scores){
            if(err) throw err;

            res.send(scores);
        });
    });

    app.post('/api/score',function(req,res){
        let newScore = Scores({
            name: req.body.username,
            score: req.body.score,
            timeSpentTurningLeft: req.body.timeSpentTurningLeft,
            timeSpentTurningRight: req.body.timeSpentTurningRight,
            jumps: req.body.jumps,
            createdOn: new Date()
        });

        if( req.body._id ){
            Scores.findByIdAndUpdate(req.body._id,{
                name: req.body.username
            }, function(err,tod){
                if(err) throw err;

                res.send({
                    status: 1
                });
            });
        } else {
            newScore.save(function(err,score){
                if(err) throw err;
    
                res.send(JSON.stringify({
                    status: 1,
                    insertedId: score._id
                }));
            });
        }
    });

    app.delete('/rhino-run/delete-all',function(req,res){
        if( req.body.token != 'password-secured' ){
            throw '404 error';
        }
        
        Scores.deleteMany({},function(err,deleted){
            if(err) throw err;

            res.send(deleted);
        });
    });
}