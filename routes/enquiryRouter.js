var express = require('express');
var bodyParser = require('body-parser');
var Enquiries = require('../models/enquiries');

var enquiryRouter = express.Router()
enquiryRouter.use(bodyParser.json())

enquiryRouter.route('/')
.get( function(req, res, next) {
    Enquiries.find(req.query) 
        .exec( function(err, enquiries) {
           if (err) next(err);
           res.json(enquiries);
        });
})
.post( function(req, res, next) {
    Enquiries.create(req.body, function(err, enquiry) {
        if (err) next(err);
        console.log('Enquiry received!');
        var id = enquiry._id;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Added the enquiry with id: ' + id);
    });
})
.delete( function(req, res, next) {
    Enquiries.remove({}, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

enquiryRouter.route('/:enquiryId')
.delete( function(req, res, next) {  
    Enquiries.findByIdAndRemove(req.params.enquiryId, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

module.exports = enquiryRouter;
