import React, { useState, useEffect, useContext } from "react";
// import Hero from "../Components/Hero";
// import Appointmentform from "../Components/Appointmentform";
// import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
// import Newappointment from "../Components/Newappointment";
import { Link } from "react-router-dom";
import { Admincontext } from "../main";

function Appointment() {
  const { isAuthenticated, setIsAuthenticated, user } =
    useContext(Admincontext);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const adjustedDate = new Date(
    newDate.getTime() - newDate.getTimezoneOffset() * 60000
  );

  // Fetch all appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://allobackend.onrender.com/api/v1/apoointment/getallappointmentforadmin",
          { withCredentials: true,
            credentials: "include",
           }
        );
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };
    fetchAppointments();

    const fetchdoctors = async () => {
      try {
        const res = await fetch(
          "https://allobackend.onrender.com/api/v1/user/getalldoctors",
          {
            withCredentials: true,
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

  // Open modal for rescheduling
  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(new Date(appointment.appointment_date));
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Handle rescheduling logic
  const handleReschedule = async () => {
    console.log(selectedAppointment._id);
    if (!selectedAppointment) return;

    try {
      const res = await axios.put(
        `https://allobackend.onrender.com/api/v1/apoointment/updateadmin/${selectedAppointment._id}`,
        {
          appointment_date: newDate.toISOString(),
        },
        {
          withCredentials: true,
          credentials: "include", 
        }
      );

      // Update the local state with the new appointment date
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === selectedAppointment._id
            ? { ...appointment, appointment_date: newDate.toISOString() }
            : appointment
        )
      );

      toast.success(
        res.data.message || "Appointment rescheduled successfully."
      );
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error rescheduling appointment."
      );
      console.error("Error rescheduling appointment:", error);
    }
  };

  // Handle status update
  const handleStatus = async (appointmentId, status) => {
    // console.log(typeof appointmentId)
    try {
      const { data } = await axios.put(
        `https://allobackend.onrender.com/api/v1/apoointment/updateadmin/${appointmentId}`,
        { status },
        { withCredentials: true,
          credentials: "include",
         }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message || "Status updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  const handledeleteappointment = async (aid) => {
    try {
      const { data } = await axios.delete(
        `https://allobackend.onrender.com/api/v1/apoointment/deleteadmin/${aid}`,

        { withCredentials: true,
          credentials: "include",
         }
      );

      setAppointments((preapp) =>
        preapp.filter((appoint) => appoint._id != aid)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {/* Reschedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="h-48 w-72 bg-purple-400  m-auto items-center flex flex-col justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <div className="mt-4 flex  space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleReschedule}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Appointments Table */}
      <div className="overflow-x-auto px-2 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10  p-5 mt-5 rounded-xl w-[95%] mx-auto shadow-[10px_10px_60px_0px_#c6f6d5]">
          {/* User Profile */}
          <div className="flex flex-col items-center md:flex-row shadow-md h-auto md:h-60 p-5 md:p-10">
            <img
              src="https://abhayhospital.com/assets/Abhay/dummy.jpg"
              alt="Profile"
              className="w-40 md:w-60"
            />
            <div className="text-center md:text-left md:ml-5 mt-5 md:mt-0">
              {user && (
                <>
                  <h1 className="text-2xl md:text-3xl text-blue-400 font-bold">
                    Hello...
                  </h1>
                  <p className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm md:text-lg mt-2">
                    Welcome back! Here's your dashboard summary.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Appointment Count */}
          <div className="shadow-md flex flex-col justify-center items-center h-auto md:h-60 p-5">
            <h1 className="text-3xl md:text-4xl font-bold text-green-500">
              Appointments
            </h1>
            <p className="text-2xl font-bold mt-2">{appointments?.length}</p>
          </div>

          {/* Doctors Count */}
          <div className="shadow-md flex flex-col justify-center items-center h-auto md:h-60 p-5">
            <h1 className="text-3xl md:text-4xl font-bold text-green-500">
              Doctors
            </h1>
            <p className="text-2xl font-bold mt-2">{doctors?.length}</p>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Queue
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Doctor
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Department
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appoint, index) => (
              <tr key={appoint._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-lg text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.firstName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {new Date(appoint.appointment_date).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.doctor.firstName} {appoint.doctor.lastName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.department}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  <select
                    value={appoint.status}
                    onChange={(e) => handleStatus(appoint._id, e.target.value)}
                    className={` focus:outline-none   ${
                      appoint.status === "Pending"
                        ? "text-yellow-500"
                        : appoint.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <option value="Pending" className="text-yellow-500">
                      Pending
                    </option>
                    <option value="Accepted" className="text-green-500">
                      Accepted
                    </option>
                    <option value="Rejected" className="text-red-500">
                      Rejected
                    </option>
                  </select>
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  <button
                    onClick={() => openRescheduleModal(appoint)}
                    className="text-blue-500 hover:underline"
                  >
                    Reschedule
                  </button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  <button onClick={() => handledeleteappointment(appoint._id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Other Components */}
      {/* <Appointmentform /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Appointment;
