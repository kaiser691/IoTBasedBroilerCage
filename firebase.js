// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA3Ugcz3Uh4GKo63_vPTinlqM1hfs5Yl0g",
    authDomain: "iot-based-monitoring-dc003.firebaseapp.com",
    databaseURL: "https://iot-based-monitoring-dc003-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-based-monitoring-dc003",
    storageBucket: "iot-based-monitoring-dc003.firebasestorage.app",
    messagingSenderId: "736998581410",
    appId: "1:736998581410:web:027775bc1134d6630c23fb",
    measurementId: "G-PQZEYXD9L3"
  };


import { getDatabase, ref, get, child, onValue } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

//(Realtime Updates) put every dashboard updates here, so that the dashboard will update in real-time when the data changes in the database.
const dashboardUpdates = () =>{
  updateTempHumidity();
  toggleWaterContainer();
  toggleFeederContainer1();
  toggleFeederContainer2();
  toggleWasteContainer();
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// 3. Reference the root of your database
const rtdbRef = ref(database);

onValue(rtdbRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Data from Firebase:", data);
    window.temperature = data.Environment.temperature;
    window.humidity = data.Environment.humidity;  
    window.feederContainer1 = data.Feeds.container1; 
    window.feederContainer2 = data.Feeds.container2;
    window.waterContainer = data.Feeds.water;
    window.wasteContainer = data.Feeds.waste;
    dashboardUpdates(); // Call the function to update the dashboard with new data
  }else{
    console.log("No data available at this path");
  }
}, (error) =>{
  console.error("Error reading data from Firebase:", error);
});


