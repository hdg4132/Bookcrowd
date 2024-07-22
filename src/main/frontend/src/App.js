// import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import CheckoutList from "./pages/CheckoutList";
import CheckoutView from "./pages/CheckoutView";
import CheckoutWrite from "./pages/CheckoutWrite";
import './component/reset.css';
import Header from "./component/Header";
import classNames from "classnames";
// 현재 경로를 가져오기 위한 코드
const currentPath = window.location.pathname;

// /adm 경로에서는 헤더 노출되지 않도록 수정
const appClasses = currentPath.includes('/adm/') ? 'App header_hidden' : 'App';
function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);



  return (
    <div className={appClasses}>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/rent_admin" element={<Rent_admin />} />
        <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />

        {/*240722 sjh 책 대여하기*/}
        <Route path='/adm/checkoutWrite' element={<CheckoutWrite/>}/>
        <Route path='/checkout' element={<CheckoutList/>}/>
        <Route path='/checkout/:id' element={<CheckoutView/>}/>
      </Routes>
    </div>
  );
}

export default App;
