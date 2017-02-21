var express = require('express');


var jwt = require('jsonwebtoken');
var router = express.Router();
var Message = require('../models/message.js');
var User = require("../models/user");

router.get('/',function(req, res, next){
    Message.find()
        .exec(function(err, messages){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                messages: 'Success',
                obj: messages
            });
        });
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if (err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error : err
            });
        }
        next();
    });
});

router.post('/', function(req, res, next){
    var decode = jwt.decode(req.query.token);
    User.findById(decode.user._id, function(err, user){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function(err, result){
            if (err){
                return res.status(500).json({   
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                title: 'Saved Message',
                obj: result
            });
        });
    });            
});

router.patch('/:id', function(req, res, next){
    var decode = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message){
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'No message found'}
            });
        }
        if (message.user != decode.user._id){
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error : {mesage: 'User does not match'}
                });
        }
        message.content = req.body.content;
        message.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Updated Message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next){
    var decode = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message){
            return res.status(500).json({
                title: 'Message No Found',
                error: {message: 'Message No Found'}
            });
        }
        if (message.user != decode.user._id){
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error : {mesage: 'User does not match'}
                });
        }
        message.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Deleted message',
                obj: result
            })
        });
    });
});

module.exports = router;
