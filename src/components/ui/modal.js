import React from "react";
import "./modal.css";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg w-1/2">
        <button className="modal-close-button text-red-500 float-right" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
