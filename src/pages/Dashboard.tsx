import React from "react";
import SideBar from "../components/SideBar";

function Dashboard() {
  return (
    <SideBar>
      <div className="h-max sys-app-notCollapsed" style={{ height: "1000vh" }}>
        Welcome to the side bar lmao
      </div>
    </SideBar>
  );
}

export default Dashboard;
