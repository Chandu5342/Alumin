// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Main/Dashboard';
import Login from './Login/Login';
import './App.css'
import Studentlogin from './Student/Studentlogin';
import Studentsignup from './Student/Studentsignup';
import Aluminilogin from './Alumini/Aluminilogin';
import Alumnisignup from './Alumini/Alumnisignup';
import Aldashboard from './Alumini/Aldashboard';
import Profil from './Alumini/Profil';
import Donation from './Alumini/Menubar/Donation';
import Feedback from './Alumini/Menubar/Feedback';
import Networkinghub from './Alumini/Menubar/Networkinghub';
import Portaljob from './Alumini/Menubar/Portaljob';
import Studentdirectory from './Alumini/Menubar/Studentdirectory';
import Reunion from './Alumini/Menubar/Reunion';
import Studentmenu from './Student/studentmenu';
import Smenubar from './Student/Smenubar';
import Stprofil from './Student/Stprofil';
import Sfeedback from './Student/Sfeedback';
import Sreunion from './Student/Sreunion';
import Sstudentdirectory from './Student/Sstudentdirectory';
import Sportaljob from './Student/Sportaljob';
import Snetworkinghug from './Student/Snetworkinghug';


const App = () => {
  return (
    <>
    
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentlogin" element={<Studentlogin />} />
        <Route path="/studentsignup" element={<Studentsignup />} />
        <Route path="/aluminilogin" element={<Aluminilogin />} />
        <Route path="/aluminisignup" element={<Alumnisignup />} />
        <Route path="/aldashboard" element={<Aldashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/feedbaack" element={<Feedback />} />
        <Route path="/networkinghub" element={<Networkinghub />} />
        <Route path="/portaljob" element={<Portaljob />} />
        <Route path="/reunion" element={<Reunion/>} />

        
        <Route path="/studentdirectory" element={<Studentdirectory/>} />
        <Route path="/studentmenu" element={<Studentmenu />} />
        <Route path="/smenubar" element={<Smenubar />} />
        <Route path="/sfeedback" element={<Sfeedback />} />
        <Route path="/sreunion" element={<Sreunion />} />
        <Route path="/sstudentdirectory" element={<Sstudentdirectory />} />
        <Route path="/sportaljob" element={<Sportaljob />} />
        <Route path="/snetworkinghub" element={<Snetworkinghug />} />
        










        
        
      </Routes>
    </BrowserRouter>
    </>

  );
};

export default App;
