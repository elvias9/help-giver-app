const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Request = require('../models/Request');



//rendering the view to post a new request
router.get('/requests/new', (req, res) => {
  res.render('requests/new')
})

//rendering the view to edit a posted request
router.get('/requests/:id/edit', /* MIDDLEWARE for LoggedIn seeker*/ (req, res) => {
  Request.findById(req.params.id)
  .then(request => {
    res.render('requests/edit', { request })
  })
  .catch (err => {
    console.log(err)
  })
})

// post changes in edit back to the seeker view with all requests

router.post('/index', /* MIDDLEWARE for LoggedIn seeker*/ (req, res) => {
  const { description, location, date } = req.body
  Request.findByIdAndUpdate(req.params.id, {description, location, date})
  .then((request) => {
    console.log('The request to edit:', request)
    res.redirect('requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})


//rendering the view to delete a request
router.get('/requests/:id/delete', /* MIDDLEWARE for LoggedIn seeker*/ (req, res) => {
  Request.findOneAndDelete({_id : req.params.id})
  .then((request) => {
    console.log('This is the request to delete', request)
    res.redirect('requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})

// view of seeker user with all his/her requests
router.get('/requests/index', /* MIDDLEWARE for LoggedIn seeker*/ (req, res) => {
  Request.find()
  .then(requests => {
    res.render('requests/index', { myRequests: requests })
  })
  .catch(err => {
    console.log(err)
  })
})

// route to post from request form to the seeker view with all his/her requests
router.post('/requests/index', (req,res) => {
  const { description, location, date } = req.body
    Request.create({description, location, date})
    .then((request) => {
        console.log(request)
      res.render('requests/index', { myRequests: request})
    })
    .catch((err) => {
      console.log(err)
    })
});


module.exports = router;