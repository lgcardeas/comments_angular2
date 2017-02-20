var express = require('express');

var router = express.Router();
var Message = require('../models/message.js');

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

router.post('/', function(req, res, next){
    var message = new Message({
        content: req.body.content
    });

    message.save(function(err, result){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            title: 'Saved Message',
            obj: result
        });
    });
});

router.patch('/:id', function(req, res, next){
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
