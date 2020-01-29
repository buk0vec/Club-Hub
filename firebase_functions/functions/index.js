const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.test = functions.https.onRequest((req,res)=>{
  const club = req.query.club;
  const uid = req.query.uid;
  db.collection('/users/'+uid+'/clubs').doc(club).set({
    club: club,
    position: 'member'
  }).then(
  db.collection('/clubs/'+club+'/members').doc(uid).set({
    user: uid
  })).then(res.send('test succcessful').catch(er);
});
exports.joinClub = functions.https.onCall((data,context)=>{
  const club = data.club.val;
  const uid = context.auth.uid;
  db.collection('/users/'+uid+'/clubs').doc(club).set({
    club: club,
    position: 'member'
  }).then(
  db.collection('/clubs/'+club+'/members').doc(uid).set({
    user: uid
  })).then.catch(err);
});