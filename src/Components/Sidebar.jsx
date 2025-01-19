import React, { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Admincontext } from "../main";

function Sidebar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Admincontext);
  const handlelogout = async () => {
    const res = await fetch(
      "http://localhost:9000/api/v1/user/adminlogout",
      {
        withCredntials: true,
        credentials: "include",
        method: "GET",
        // credentials: 'include',
      }
    );
    const data = await res.json();
    if (data.success == false) {
      toast.error(data.message, {
        autoClose: 1200,
      });
    } else {
      navigate("/");
      toast.success(data.message, {
        autoClose: 1200,
      });
      setIsAuthenticated(false);
    }
  };
  return (
    <>
      {isAuthenticated && (
        <div className="text-4xl     mt-44 px-4">
          <Link to={"/Dashboard"}>
            <IoHome />
          </Link>
          <br />

          <Link to={"/Adddoctor"}>
            <IoPersonAddSharp />
          </Link>
          <br />
          <Link to={"/Alldoctors"}>
            
            <FaUserDoctor />
          </Link>
          <br />

          <RiLogoutBoxFill onClick={handlelogout} />
        </div>
      )}
    </>
  );
}

export default Sidebar;
