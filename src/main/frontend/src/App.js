import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import Header from "./component/Header";

import KeepingList from "./component/BookKeeping/KeepingList";
import KeepingItem from "./component/BookKeeping/KeepingItem";
import KeepingRegister from "./component/BookKeeping/KeepingRegister";

import AdminRegisterBook from "./component/admin/AdminRegisterBook";
import AdminRegisterList from "./component/admin/AdminRegisterList";

function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);

  return (
    
      <div className="App">
        {/* <Header /> */}
        
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/books" element={<KeepingList />} />
            <Route path="/register" element={<KeepingRegister />} />
            <Route path="/book/:id" element={<KeepingItem />} />
            <Route path="/admin/list" element={<AdminRegisterList />} />
            <Route path="/admin/register" element={<AdminRegisterBook />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/rent_admin" element={<Rent_admin />} />
            <Route
              path="/rent_admin_canceled"
              element={<Rent_admin_canceled />}
            />
          </Routes>
        
      </div>
  
  );
}

export default App;
