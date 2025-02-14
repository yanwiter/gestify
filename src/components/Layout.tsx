import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import MainContent from "./MainContent/MainContent";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <MainContent />
      </main>
    </div>
  );
}