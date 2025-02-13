import React from "react";
import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <Outlet />
    </div>
  );
}