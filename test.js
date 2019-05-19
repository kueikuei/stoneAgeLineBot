var admin = require("firebase-admin");
// var serviceAccount = require("./sabot-dca8c-firebase-adminsdk-mqrmy-1c07d286ac.json");

admin.initializeApp({
  credential: admin.credential.cert(process.env.FirebaseKey),
  databaseURL: "https://sabot-dca8c.firebaseio.com"
});

var db = admin.database()

// get data
db.ref().on('value',function(snapshot){
    console.log(JSON.stringify(snapshot.val(),null,2));
})
