// Load zone.js for the server.
require('zone.js/dist/zone-node');
const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const { enableProdMode } = require('@angular/core');

// query setup
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// SSR Setup
// Import renderModuleFactory from @angular/platform-server.
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const AppServerModuleNgFactory = require('./dist-server/main.bundle').AppServerModuleNgFactory;

// Load the index.html file.
const index = require('fs').readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8');
let app = express();

//handle the query route - 
// I've not worked out why yet, but this route is not always recognised.
app.get('/registerQuery', (req, res) => {
  const original = req.query.q;
  admin.database().ref('/queries').push({
      query: original,
      timestamp: new Date().toUTCString(),
    }).then(snapshot => {
    res.status(200).end();
  });
})

// this handles all over routes, returning our server side rendered content
app.get('**', function(req, res) {
  // we need to reconstruct the url, adding query params if they exist
  let path = req.path;
  if(req.query.q) {
    path = `${path}?q=${req.query.q}`;
  }
  renderModuleFactory(AppServerModuleNgFactory, {document: index, url: path})
      .then(html => {
          // TOOD enalbe caching
          res.status(200).send(html)
      })
      .catch( function(e) {
         console.log(e)
      });
});
exports.ssr = functions.https.onRequest(app);

