import React, { useContext, useState, useEffect } from "react";
import { Admincontext } from "../main";

function Alldoctors() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Admincontext);
  const [inval, setInval] = useState("");
  useEffect(() => {
    const fetchdoctors = async () => {
      try {
        const res = await fetch(
          "http://localhost:9000/api/v1/user/getalldoctors",
          {
            withCredntials: true,
            credentials: "include",
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        setDoctors(data.doctors);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdoctors();
  }, []);

  return (
    <>
      <div className="w-[100%]">
        <div className="px-14 mt-10">
          <input
            type="text"
            className="w-[20%] border-2 py-2 px-2 rounded-2xl border-black"
            onChange={(e) => setInval(e.target.value)}
            value={inval}
            placeholder="serach doctors by there name.."
          />
        </div>
        <br />
        <br />
        <div className="shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-[93%] m-auto  rounded-2xl p-4 mb-5  ">
          <h1 className="text-3xl text-blue-400 font-bold">Doctors</h1>
          <br />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {doctors && doctors.length > 0 ? (
              doctors
                .filter((item) =>
                  item.firstName.toLowerCase().includes(inval.toLowerCase())
                )
                .map((doc) => {
                  return (
                    <>
                      <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-4 rounded-2xl">
                        <img
                          src={doc.docAvatar && doc.docAvatar.url}
                          alt="docavatar"
                          className="w-[200px] h-[200px] rounded-full m-auto"
                        />
                        <p className="text-xl text-center">
                          {doc.firstName} {doc.lastName}
                        </p>
                      </div>
                      <div className="text-xl mt-10">
                        <p className="font-semibold">
                          Email :-{" "}
                          <span className="font-normal">{doc.email}</span>
                        </p>
                        <p className="font-semibold">
                          Phone :-{" "}
                          <span className="font-normal">{doc.phone}</span>
                        </p>
                        <p className="font-semibold">
                          DOB :-{" "}
                          <span className="font-normal">
                            {doc.dob.substr(0, 10)}
                          </span>
                        </p>
                        <p className="font-semibold">
                          Department{" "}
                          <span className="font-normal">
                            {doc.doctorDepartment}
                          </span>
                        </p>
                        <p className="font-semibold">
                          HospitalId :-{" "}
                          <span className="font-normal">{doc.Hospitalid}</span>
                        </p>

                        <p className="font-semibold">
                          Gender :-{" "}
                          <span className="font-normal">{doc.gender}</span>
                        </p>
                        <p className="font-semibold">
                          Location :-{" "}
                          <span className="font-normal">{doc.location}</span>
                        </p>
                      </div>
                    </>
                  );
                })
            ) : (
              <h1>There are no doctors</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Alldoctors;
