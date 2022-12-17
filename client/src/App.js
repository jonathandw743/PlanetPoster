import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import CreateASession from "./components/CreateASession";
import EnterASession from './components/EnterASession';
import JoinASession from "./components/JoinASession";

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to={"/joinasession"} />} />
      <Route path="/createasession" element={<CreateASession />} />
      <Route path="/joinasession" element={<JoinASession />} />
      <Route path="/enterasession" element={<EnterASession />} />
      <Route path="*" element={404} />
    </Routes>
      
    </div>
  )
}

export default App