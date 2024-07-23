import "./App.css";
// import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Footer from "./component/Footer";
import Rent from "./component/Rent";
// import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import CommunityList from "./pages/board/CommunityList";
import CommunityDetail from "./pages/board/CommunityDetail";
import CommunityEdit from "./pages/board/CommunityEdit";

function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/rent_admin" element={<Rent_admin />} />
        <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />

        {/* 20240723 kwj 커뮤니티 */}
        <Route path="/community" element={<CommunityList />}></Route>
        <Route path="/communityDetail" element={<CommunityDetail />}></Route>
        <Route path="/communityEdit" element={<CommunityEdit />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
