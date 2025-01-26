import React from "react";
import "./card.css";

export const Card = ({ children }) => (
  <div className="card card-content p-4 shadow-md rounded-lg bg-white">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
