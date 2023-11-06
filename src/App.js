import { Auth } from "./components/auth";
import { Register } from "./pages/register";
import { Landing } from "./pages/landing";
import { Home } from "./pages/home";
import { Add } from "./pages/add";
import { Edit } from "./pages/edit";
import { Routes, Route } from 'react-router-dom'
import { Parking } from "./pages/parking";
import { Dashboard } from "./pages/dashboard";
import { auth } from "./config/firebase";
import { Result } from "./pages/result";
import { Status } from "./pages/status";
import { Logout } from "./pages/logout";
import { Information } from "./pages/information";
import { Report } from "./pages/report";
import { January } from "./pages/monthly/january";
import { February } from "./pages/monthly/february";
import { March } from "./pages/monthly/march";
import { April } from "./pages/monthly/april";
import { May } from "./pages/monthly/may";
import { June } from "./pages/monthly/june";
import { July } from "./pages/monthly/july";
import { August } from "./pages/monthly/august";
import { September } from "./pages/monthly/september";
import { October } from "./pages/monthly/october";
import { November } from "./pages/monthly/november";
import { December } from "./pages/monthly/december";
import './App.css';
import PrivateRoutes from "./components/privateRoutes";
import { db, realtimeDb, storage } from "./config/firebase";
import { set, ref, onValue, update } from "firebase/database";
import { collection, doc, updateDoc, } from "firebase/firestore"
import { useState, useEffect } from "react";
import { ref as refStorage, getDownloadURL, listAll } from "firebase/storage";

function App() {

  // this is the setTodos
  const [cameraStatus, setCameraStatus] = useState("");
  const [gurneyParagonCamera, setGurneyParagonCamera] = useState("");

  // this is the setTodo
  const [ocrStatus, setOcrStatus] = useState([]);

  // display image state
  const [imageList, setImageList] = useState([]);

  // to access the data folder to display the images 
  const imageListRef = refStorage(storage, "/data");

  var userEmail = auth?.currentUser?.email.toString();

  const parkingCollectionRef = collection(db, "Parking");

  var currentParkingIdentifier = sessionStorage.getItem("parkingName");

  if (currentParkingIdentifier == "gurneyPlazaMotorcycle") {
    var parkingName = "gurneyPlaza";
  } else if (currentParkingIdentifier == "pranginMallMotorcycle") {
    var parkingName = "pranginMall";
  } else if (currentParkingIdentifier == "queensbayMallMotorcycle") {
    var parkingName = "queensbayMall";
  } else if (currentParkingIdentifier == "gurneyParagonMotorcycle") {
    var parkingName = "gurneyParagon";
  }

  // to test the image processing function
  var storageImageUrl = "https://firebasestorage.googleapis.com/v0/b/marc-6d5c6.appspot.com/o/data%2Fphoto.jpg?alt=media&token=159659a1-9bc0-4510-8e2f-914ccb5d3449&_gl=1*irga0x*_ga*MTYzMTYyOTQ5NS4xNjgwMDg5MDc3*_ga_CW55HF8NVT*MTY5ODA3MTY4MC4xNjkuMS4xNjk4MDcxNjgzLjU3LjAuMA..";

  // console.log(userEmail);
  // if (userEmail == null) {
  //   console.log("No user now");
  // } else {
  //   console.log("Have user now");
  // }

  // const getOCRURL = () => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         console.log(url);
  //         const myArray = url.split("/");
  //         const ocrUrl = myArray[6] + "/" + myArray[7];
  //         console.log(ocrUrl);

  //         // perform OCR

  //         // update realTimeDB

  //         setImageList((prev) => [...prev, url]);
  //       })
  //     })
  //   })
  // }

  const updateRainStatus = async (id, rainStatus) => {
    // const parkingDoc = doc(parkingCollectionRef, "gurneyParagon");
    const parkingDoc = doc(parkingCollectionRef, id);
    try {
      console.log("Here is updateRainStatus: " + rainStatus);
      await updateDoc(parkingDoc, { rain: rainStatus });
    } catch (err) {
      // console.log(err);
    }
  };

  // Firebase Realtime Database 

  // this verifies that the code in App.js
  // can run in the background
  // console.log("This is from App.js is now");

  // read data from RealTime Database

  var realtimeParking = "gurneyParagonCamera";

  useEffect(() => {
    // if (currentParking == "gurneyParagonMotorcycle") {
    //   console.log("Gurney Paragon");
    onValue(ref(realtimeDb), (snapshot) => {
      // setCameraStatus([]);
      // if (currentParking == "gurneyParagonMotorcycle") {
      setGurneyParagonCamera([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((ocrStatus) => {
          // setCameraStatus(oldArray => [...oldArray, ocrStatus]);
          setGurneyParagonCamera(oldArray => [...oldArray, ocrStatus]);

          // Rain information from rain sensor
          // if (currentParkingIdentifier == "gurneyParagon") {
          if (ocrStatus.rainGurneyParagon == "raining") {
            // console.log("raining");
            updateRainStatus("gurneyParagon", "raining");
          } else if (ocrStatus.rainGurneyParagon == "rainless") {
            updateRainStatus("gurneyParagon", "rainless");
            // console.log("rainless");
          } else if (ocrStatus.rainGurneyParagon == "no information") {
            updateRainStatus("gurneyParagon", "no information");
            // console.log("no information");
          }
          // }
          // } else if (currentParkingIdentifier == "gurneyPlaza") {
          //   if (ocrStatus.rainGurneyPlaza == "raining"){
          //     console.log("raining");
          //     updateRainStatus("gurneyPlaza", "raining");
          //   } else if (ocrStatus.rainGurneyPlaza == "rainless"){
          //     updateRainStatus("gurneyPlaza", "rainless");
          //     console.log("rainless");
          //   } else if (ocrStatus.rainGurneyPlaza == "no information"){
          //     updateRainStatus("gurneyPlaza", "no information");
          //     console.log("no information");
          //   }
          // } else if (currentParkingIdentifier == "pranginMall") {
          //   if (ocrStatus.rainPranginMall == "raining"){
          //     console.log("raining");
          //     updateRainStatus("pranginMall", "raining");
          //   } else if (ocrStatus.rainPranginMall == "rainless"){
          //     updateRainStatus("pranginMall", "rainless");
          //     console.log("rainless");
          //   } else if (ocrStatus.rainPranginMall == "no information"){
          //     updateRainStatus("pranginMall", "no information");
          //     console.log("no information");
          //   }
          // } else if (currentParkingIdentifier == "queensbayMall") {
          //   if (ocrStatus.rainQueensbayMall == "raining"){
          //     console.log("raining");
          //     updateRainStatus("queensbayMall", "raining");
          //   } else if (ocrStatus.rainQueensbayMall == "rainless"){
          //     updateRainStatus("queensbayMall", "rainless");
          //     console.log("rainless");
          //   } else if (ocrStatus.rainQueensbayMall == "no information"){
          //     updateRainStatus("queensbayMall", "no information");
          //     console.log("no information");
          //   }
          // }

          // status is updated from the ESP32CAM after an image have been stored 
          // in Firebase Storage successfully
          if (ocrStatus.status == true) {
            // console.log("The status is " + ocrStatus.status);

            // using is true when there is an admin user login
            if (ocrStatus.using == true) {

              listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                    console.log(url);
                    storageImageUrl = url;
                    console.log(storageImageUrl);
                    const myArray = url.split("/");
                    const ocrUrl = myArray[6] + "/" + myArray[7];
                    console.log(ocrUrl);

                    // image processing
                    // if (storageImageUrl != "") {
                    // if (storageImageUrl.length > 1) {
                    //   var canvas1 = document.getElementById("canvas1");
                    //   var context1 = canvas1.getContext("2d");

                    //   var image1 = document.getElementById("image");

                    //   context1.filter = 'grayscale(1)';

                    //   context1.drawImage(image1, 385, 220,
                    //     110, 80,
                    //     0, 0,
                    //     110, 100);

                    //   var canvas2 = document.getElementById("canvas2");
                    //   var context2 = canvas2.getContext("2d");

                    //   var image2 = document.getElementById("canvas1");

                    //   context2.filter = 'invert(1)';

                    //   context2.drawImage(image2, 0, 0);

                    //   // SAVE THE PICTURE
                    //   // GET URL OF THE PICTURE
                    //   const myCanvas = document.querySelector("#canvas2");
                    //   const dataURI = document.getElementById('canvas2').toDataURL("image/png");
                    //   const canvasURI = myCanvas.toDataURL("image/png");
                    //   // const w = window.open('about:blank', 'image from canvas');
                    //   // w.document.write("<img src='"+canvasURI+"' alt='from canvas'/>");
                    //   // console.log('Saved!'); 

                    //   console.log(canvasURI);
                    // } else {
                    //   console.log("No number plate image");
                    // }


                    // perform OCR


                    // update realTimeDB

                    // after detection is done set back the status (todo) to false
                    // update(ref(realtimeDb, 'cameraStatus'), {
                    //   status: 'false' 
                    // })

                    // trigger the parking barrier if OCR found a number plate
                    // update(ref(realtimeDb, 'cameraStatus'), {
                    //   barrier: true 
                    // })

                    setImageList((prev) => [...prev, url]);
                  })
                })
              })
            }
            else {
              // console.log("Cannot do OCR yet");
            }
          } else if (ocrStatus.status == false) {
            // console.log("The status is " + ocrStatus.status);
          }
        })
      }
      // } else if (currentParking == "") {
      //   console.log("No parking lot admin logged in");
      // }

    })
    // } else if (currentParking == "") {
    //   console.log("No parking lot admin logged in");
    // }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/parking" element={<Parking />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/result" element={<Result />} />
          <Route exact path="/status" element={<Status />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/information" element={<Information />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="/januaryReport" element={<January />} />
          <Route exact path="/februaryReport" element={<February />} />
          <Route exact path="/marchReport" element={<March />} />
          <Route exact path="/aprilReport" element={<April />} />
          <Route exact path="/mayReport" element={<May />} />
          <Route exact path="/juneReport" element={<June />} />
          <Route exact path="/julyReport" element={<July />} />
          <Route exact path="/augustReport" element={<August />} />
          <Route exact path="/septemberReport" element={<September />} />
          <Route exact path="/octoberReport" element={<October />} />
          <Route exact path="/novemberReport" element={<November />} />
          <Route exact path="/decemberReport" element={<December />} />
        </Route>
        {/* <Route exact path="/" element={<Landing />} /> */}
        <Route exact path="/home" element={<Home />} />
        {/* <Route exact path="/login" element={<Auth />} /> */}
        <Route exact path="/" element={<Auth />} />
        {/* <Route exact path="/register" element={<Register />} /> */}
      </Routes>


      {/* FOR IMAGE PROCESSING  */}
      <img id="image"
        hidden="true"
        // crossorigin="anonymous"
        src={storageImageUrl}
      // src="https://firebasestorage.googleapis.com/v0/b/marc-6d5c6.appspot.com/o/data%2Fphoto.jpg?alt=media&token=159659a1-9bc0-4510-8e2f-914ccb5d3449&_gl=1*irga0x*_ga*MTYzMTYyOTQ5NS4xNjgwMDg5MDc3*_ga_CW55HF8NVT*MTY5ODA3MTY4MC4xNjkuMS4xNjk4MDcxNjgzLjU3LjAuMA.."
      ></img>
      <div>
        <canvas
          hidden="true"
          width="100" height="80" id="canvas1">
        </canvas>
      </div>
      <div>
        <canvas
          hidden="true"
          width="100" height="80" id="canvas2">
        </canvas>
      </div>
      {/* FOR IMAGE PROCESSING */}


    </div>
  );
}

export default App;
