import React, { useContext, useState } from "react";
import { Admincontext } from "./main";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Adddoctor() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Admincontext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Hospitalid, setHospitalid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [location, setLocation] = useState("");
  const [availabel, setAvailabel] = useState("");

  const navigate = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddnewDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // console.log(docAvatar)
      formData.append("docAvatar", docAvatar);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("Hospitalid", Hospitalid);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("location", location);
      formData.append("availabel", availabel);
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      await axios
        .post("https://allobackend.onrender.com/api/v1/user/doctor/signup", formData, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          toast.success(res.data.message, {
            autoClose: 1400,
          });
          // console.log(res)
          setIsAuthenticated(true);
          navigate("/Dashboard");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setHospitalid("");
          setDob("");
          setGender("");
          setPassword("");
          setLocation("");
          setAvailabel("");
        });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1400,
      });
    }
  };

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <div className="w-[93%] m-auto mt-10 mb-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-500 text-center mt-10">
          Add a Doctor
        </h1>
        <br />
        <div className="flex md:flex-row sm:flex-col">
          <div className="">
            <img
              src="https://i.pinimg.com/originals/36/02/fc/3602fc580ec2e5439d9e2588c4bd3544.gif"
              alt=""
            />
          </div>
          <div className="max-w-lg mx-auto p-4 ">
            <form onSubmit={handleAddnewDoctor} className="space-y-4">
              <div>
                <label htmlFor="avatarInput">
                  <img
                    src={
                      docAvatarPreview
                        ? `${docAvatarPreview}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBD5gcNCZaL4uHxJivMUvxeHHf99vC48EjWg&s"
                    }
                    alt=""
                    className="w-36 h-36 rounded-full cursor-pointer border-2 border-blue-300"
                  />
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  className="hidden"
                  onChange={handleAvatar}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-2xl font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-2xl font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Hospitalid"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Hospitalid
                </label>
                <input
                  type="tel"
                  name="Hospitalid"
                  id="Hospitalid"
                  value={Hospitalid}
                  onChange={(e) => setHospitalid(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="dob"
                  className="block text-2xl font-medium text-gray-700"
                >
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xl font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-xl font-medium text-gray-700"
                >
                  location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="availabel"
                  className="block text-xl font-medium text-gray-700"
                >
                  availabel
                </label>
                <input
                  type="text"
                  name="availabel"
                  id="availabel"
                  value={availabel}
                  onChange={(e) => setAvailabel(e.target.value)}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-xl font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  value={doctorDepartment}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((item, index) => {
                    return (
                      <>
                        <option value={item} key={index}>
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              {/* <div>
          <p>
             Registered /
            <Link to="/login" className="text-blue-400">
              Login
            </Link>{" "}
          </p>
        </div> */}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adddoctor;
