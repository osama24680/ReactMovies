import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navabr"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Movies from "./Components/Movies/Movies"
import Network from "./Components/Network/Network"
import About from "./Components/About/About"
import NotFound from "./Components/NotFound/NotFound"
import Registor from "./Components/Registor/Registor"
import MovieDetails from "./Components/MovieDetails/MovieDetails"
import jwtDecode from "jwt-decode";


function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate()
  function getUserData() {
    let decodeItem = jwtDecode(localStorage.getItem("userToken"))
    setUserData(decodeItem)
  }


  useEffect(() => {
    console.log(userData)
  }, [userData])


  function logOut() {
    localStorage.removeItem("userToken")
    setUserData(null)
    navigate("/login")
  }


  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData()
    }
  }, [])

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />
    } else {
      return children
    }
  }
  return (
    <div className="App">
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path="Movies" element={<ProtectedRoute ><Movies /></ProtectedRoute>} />
          <Route path="moviedetails" element={<MovieDetails />}>
            <Route path=":id" element={<MovieDetails />} />
          </Route>
          <Route path="Login" element={<Login getUserData={getUserData} />} />
          <Route path="Network" element={<Network />} />
          <Route path="About" element={<About />} />
          <Route path="Registor" element={<Registor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
