// Initialize Firebase
var config = {
  apiKey: "AIzaSyC4rOG_u-M_vk1J8Vp-49w8gBsTIpLsabA",
  authDomain: "train-schedule-ba79b.firebaseapp.com",
  databaseURL: "https://train-schedule-ba79b.firebaseio.com",
  projectId: "train-schedule-ba79b",
  storageBucket: "",
  messagingSenderId: "1030597559635"
};
firebase.initializeApp(config);

var database = firebase.database();

console.log(firebase.database);
console.log("hello world");


$("#trains-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val(), "DD/MM/YY").format("X");
  var trainFreq = $("#frequency-input").val().trim();
  dateAdded: firebase.database.ServerValue.TIMESTAMP


  // template object
  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };

  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  alert("Train successfully added");


  $("#train-name-input").val("");
  $("#destination-input-input").val("");
  $("#start-input").val("");
  $("#frequency-input-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;

  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().trainDest);
  console.log(childSnapshot.val().trainStart);
  console.log(childSnapshot.val().trainFreq);


  // var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");

  $("#full-train-list").append("<div class='well'><span class='train'> " + childSnapshot.val().name +
    " </span><span class='train-destination'> " + childSnapshot.val().dest +
    " </span><span class='train-start'> " + childSnapshot.val().start +
    " </span><span class='train-frequency'> " + childSnapshot.val().freq + " </span></div>");

  // Error handling
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

// Put in HTML
$("#train-display").text(snapshot.val().name);
$("#destination-display").text(snapshot.val().dest);
$("#start-display").text(snapshot.val().start);
$("#frequency-display").text(snapshot.val().req);
});
