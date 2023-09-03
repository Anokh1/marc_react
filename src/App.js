import { Auth } from "./components/auth";

import { Register } from "./pages/register";

import { Home } from "./pages/home";
import { Add } from "./pages/add";
import { Edit } from "./pages/edit";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Parking } from "./pages/parking";
import { Dashboard } from "./pages/dashboard";
import { auth } from "./config/firebase";
import './App.css';
import PrivateRoutes from "./components/privateRoutes";

function App() {

  var userEmail = auth?.currentUser?.email.toString();

  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/add" element={<Add />} />
            <Route exact path="/edit" element={<Edit />} />
            <Route exact path="/parking" element={<Parking />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/" element={<Auth />} /> */}
          {/* <Route exact path="/register" element={<Register />} />           */}
          {/* <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router> */}
      <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/add" element={<Add />} />
            <Route exact path="/edit" element={<Edit />} />
            <Route exact path="/parking" element={<Parking />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/" element={<Auth />} />
          {/* <Route exact path="/register" element={<Register />} />           */}
          <Route exact path="/home" element={<Home />} />
        </Routes>
    </div>
  );

  // if (userEmail == "gurneyPlaza@marc.com") { 
  //   return (
  //     <div className='App'>
  //       MARC DASHBOARD
  //       <BrowserRouter>
  //         <Routes>
  //           <Route exact path="/" element={<Auth />} />
  //           <Route exact path="/register" element={<Register />} />
  //           <Route exact path="/add" element={<Add />} />
  //           <Route exact path="/edit" element={<Edit />} />
  //           <Route exact path="/parking" element={<Parking />} />
  //           <Route exact path="/dashboard" element={<Dashboard />} />
  //         </Routes>
  //       </BrowserRouter>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className='App'>
  //       MARC
  //       <BrowserRouter>
  //         <Routes>
  //           <Route exact path="/" element={<Auth />} />
  //           <Route exact path="/register" element={<Register />} />
  //           <Route exact path="/home" element={<Home />} />

  //           <Route exact path="/add" element={<Add />} />
  //           <Route exact path="/edit" element={<Edit />} />
  //           <Route exact path="/parking" element={<Parking />} />
  //           <Route exact path="/dashboard" element={<Dashboard />} />
  //         </Routes>
  //       </BrowserRouter>
  //     </div>
  //   )
  // }
  // ;
}

export default App;
