import React, { useState } from "react";
import Registration from "../../Registration/Registration"; // Import Registration Component


const Modal = ({ isOpen, closeModal }) => {
  const [action, setAction] = useState(""); // State to toggle forms
z
  const handleCloseModal = () => {
    closeModal(); // This will close the modal
    setAction(""); // Reset form action
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-96 relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-white text-xl"
          >
            ×
          </button>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setAction("login")}
              className="mx-4 py-2 px-6 text-white bg-primary rounded-full"
            >
              Login
            </button>
            <button
              onClick={() => setAction("register")}
              className="mx-4 py-2 px-6 text-white bg-secondary rounded-full"
            >
              Register
            </button>
          </div>

          {action === "register" ? (
            <Registration /> // Render Registration Form
          ) : (
            <LoginModal /> // Render Login Form
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
