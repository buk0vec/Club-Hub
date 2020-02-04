const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.followClub = functions.https.onCall((data,context)=>{
  const club = data.club;
  const uid = context.auth.uid;
  db.collection('/users/'+uid+'/clubs').doc(club).set({
    club: club,
    position: 'follower'
  }).catch(err);
});

exports.joinClub = functions.https.onCall((data,context)=>{
  const club = data.club;
  const uid = context.auth.uid;
  db.collection('/users/'+uid+'/clubs').doc(club).set({
    club: club,
    position: 'member'
  }).then(db.collection('/clubs/'+club+'/members').doc(uid).set({
    user: uid
  })).catch(err);
});