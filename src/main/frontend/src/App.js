import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import UserChatPage from './component/realChat/UserChatPage';
import RealChatPage from './component/realChat/RealChatPage';
import ChatPage from "./component/realChat/ChatPage";

function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);



  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/rent_admin" element={<Rent_admin />} />
      <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />
      <Route path="/userchat" element={<UserChatPage />} />
      <Route path="/realchat" element={<RealChatPage />} />
      <Route path="/chatpage" element={<ChatPage />} />
    </Routes>
    </div>
  );
}

export default App;
