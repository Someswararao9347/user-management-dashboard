import React from "react";
import "./button.css";

export const Button = ({ children, onClick, variant = "primary", ...props }) => {
  const styles =
    variant === "destructive"
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white";
  return (
    <button
      className={`px-4 py-2 rounded button button-primary button-destructive button-secondary`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
