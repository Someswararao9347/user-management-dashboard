import React from "react";
import "./input.css";

export const Input = ({ label, ...props }) => (
  <div className="mb-2 input-container">
    <label className="input-label block mb-1 font-semibold">{label}</label>
    <input className="input-field border px-2 py-1 rounded w-full" {...props} />
  </div>
);
