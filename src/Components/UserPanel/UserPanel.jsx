import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UserPanel = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    shipping_address: "",
    city: "",
    state: "",
    country: "",
    email: "",
    contact: "",
    birthdate: "",
    gender: "",
  });

  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("User email not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/getUserByEmail?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const userData = await response.json();
      setFormData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        shipping_address: userData.shipping_address || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
        email: userData.email || "",
        contact: userData.contact || "",
        birthdate: userData.birthdate ? userData.birthdate.split("T")[0] : "",
        gender: userData.gender || "",
      });

      setUsername(userData.firstname || "");
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    const handleLogoutEvent = () => {
      setFormData({
        firstname: "",
        lastname: "",
        shipping_address: "",
        city: "",
        state: "",
        country: "",
        email: "",
        contact: "",
        birthdate: "",
        gender: "",
      });
      setUsername("");
    };

    window.addEventListener("storage", handleLogoutEvent);

    return () => {
      window.removeEventListener("storage", handleLogoutEvent);
    };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    const phoneNumber = formData.contact.replace(/\D/g, "").slice(-10);
  
    if (phoneNumber.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Contact number must be exactly 10 digits.",
      });
      return;
    }
  
    if (!formData.gender || formData.gender === "Select Gender") {
      Swal.fire({
        icon: "warning",
        title: "Gender Required",
        text: "Please select a valid gender.",
      });
      return;
    }
  
    console.log("Submitting form data:", formData); // ✅ Debugging log
  
    try {
      const response = await fetch("http://localhost:3002/userpanel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Failed to save user data");
  
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        showConfirmButton:false
      });
  
      setIsEditing(false);
      fetchUserData(); // ✅ Re-fetch user data after saving
    } catch (error) {
      console.error("Error saving user data:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row w-full dark:bg-gray-900">
      {/* Sidebar - Hidden on small screens */}
      <div className="">
        <Sidebar fetchUserData={fetchUserData} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center w-full px-4 md:px-10 mt-6 md:pt-20  md:pb-11 mb-5">
        <h1 className="text-2xl  md:text-4xl dark:text-white font-bold text-center">
          Welcome, {username}!
        </h1>

        {/* Responsive Form */}
        <form className="w-full max-w-4xl grid grid-cols-2 gap-3 md:gap-x-4 text-black  py-4 px-6 rounded-lg shadow-md dark:bg-gray-500 ">
          {[
            { label: "First Name", key: "firstname", type: "text" },
            { label: "Last Name", key: "lastname", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Address", key: "shipping_address", type: "text" },
            { label: "City", key: "city", type: "text" },
            { label: "State", key: "state", type: "text" },
            { label: "Country", key: "country", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-black ">{label}</label>
              <input
                type={type}
                value={formData[key]}
                placeholder={label}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                readOnly={!isEditing}
                className={`w-full p-2 rounded-md border ${
                  isEditing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>
          ))}

          {/* Phone Input */}
          <div>
            <label className="block text-black ">Contact</label>
            <PhoneInput
              country={"in"}
              value={formData.contact}
              onChange={(value) => setFormData({ ...formData, contact: value })}
              inputStyle={{ width: "100%" }} // Ensure full width
              isValid={() => true} // ✅ Always returns true, preventing red border
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-black font-">Birthdate</label>
            <input
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              readOnly={!isEditing}
              className={`w-full p-2 rounded-md border ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Gender Dropdown */}
          <div>
            <label className="block text-black ">Gender</label>
            <select
              value={formData.gender || ""} // Ensure controlled component
              onChange={(e) => {
                console.log("Selected Gender:", e.target.value); // ✅ Debugging log
                setFormData({ ...formData, gender: e.target.value });
              }}
              disabled={!isEditing}
              className={`w-full p-2 rounded-md border ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-center mt-6 gap-6">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="text-white bg-green-800 font-bold py-3 px-8 rounded-full hover:scale-105 transition"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="text-white bg-green-800 font-bold py-3 px-8 rounded-full hover:scale-105 transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
