const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.joinClub = functions.https.onCall((data,context)=>{
  
  const club = data.club;
  const uid = context.auth.uid;
  
  db.collection('/users/'+uid+'/clubs').doc(club).set({
    club: club,
    position: 'member'
  }).then(db.collection('clubs').doc(club).update({
    members: admin.firestore.FieldValue.arrayUnion(uid)
  })).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    // ADD THIS THROW error
    throw error;
  });
});
exports.leaveClub = functions.https.onCall((data,context)=>{
  
  const club = data.club;
  const uid = context.auth.uid;
  
  db.collection('/users/'+uid+'/clubs').doc(club).delete(
    ).then(db.collection('clubs').doc(club).update({
    members: admin.firestore.FieldValue.arrayRemove(uid)
  })).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    // ADD THIS THROW error
    throw error;
  });
});