const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.registerQuery = functions.https.onRequest((req, res) => {
  const original = req.query.q;
  admin.database().ref('/queries').push({
      query: original,
      timestamp: new Date().toUTCString(),
    }).then(snapshot => {
    console.log('wrote query to ' + snapshot.ref);
    res.status(200).end();
  });
});
