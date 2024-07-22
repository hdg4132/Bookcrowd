import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
import Header from "./component/Header";

function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);



  return (
      <Router>
          <Header />
      <Routes>
        <div className="App">
          <Route path="/" element={<Main/>}/>
          <Route path="/rent" element={<Rent/>}/>
          <Route path="/rent_admin" element={<Rent_admin/>}/>
          <Route path="/rent_admin_canceled" element={<Rent_admin_canceled/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Mypage" element={<Mypage />} />
        </div>
      </Routes>
      </Router>
);
}

export default App;
