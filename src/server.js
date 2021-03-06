'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

const bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react');

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

const Users = mongoose.model('Users', {
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        ref: "Username"
    },
    password: {
        type: String,
        required: true
    },

});

app.post("/login",function(req,res){
    res.send("loggedIn": true);
    var password = req.body.password;
    Users.findOne({username: req.body.username })
        .then(function (result) {
            if (result.password == password) {
                console.log("Login Authenticated");
                res.send("loggedIn": true);
            }
            else {
                console.log("Authentication Failed");
                res.send("loggedIn": false);
            }
        });
});

// universal routing and rendering
app.get('*', (req, res) => {
    console.log("req.url: "  + req.url);
    match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }
      console.log("redirecting to :",redirectLocation);
      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

    //   console.log({ markup })
      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
