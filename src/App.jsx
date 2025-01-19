import { useContext, useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Admincontext } from './main'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Adddoctor from './Adddoctor';
import Alldoctors from './Components/Alldoctors';


function App() {

  const { isAuthenticated, setIsAuthenticated, user, setUser } =useContext(Admincontext)
  useEffect(() => {
    const fecthuser = async () => {
      try {
        const res = await fetch(
          "https://allobackend.onrender.com/api/v1/user/admin/details",
          {
            withCredntials: true,
            credentials: "include",
            method: "GET",
            // headers: {
            //   "Content-Type": "application/json",

            // },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.success == true) {
          // console.log("isa")
          setIsAuthenticated(true);
          setUser(data.user);
          // <Navigate to={"/"} />;
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (err) {
        console.log(err);
      }
    };
    fecthuser();
  }, [isAuthenticated]);
  return (
   <>
   <div className="flex shadow-[inset_50px_0px_50px_0px_#9ae6b4] ">
   <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Adddoctor" element={<Adddoctor />} />
            <Route path="/Alldoctors" element={<Alldoctors />} />
          
          </Routes>
          <ToastContainer />
        </BrowserRouter>

   </div>
   </>
  )
}

export default App
