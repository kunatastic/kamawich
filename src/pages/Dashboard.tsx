import React from "react";
import Card from "../components/Card";
import SideBar from "../components/SideBar";

function Dashboard() {
  const CardData = [
    {
      title: "Completed Tasks",
      count: 0,
      color: "bg-gradient-to-br from-green-300 to-green-500",
      hoverColor: "bg-gradient-to-br from-green-800 hover:to-green-600",
    },
    {
      title: "Incomplete Tasks",
      count: 0,
      color: "bg-gradient-to-br from-red-300 to-red-500",
      hoverColor: "bg-gradient-to-br from-red-800 hover:to-red-600",
    },
    {
      title: "Total Tasks",
      count: 0,
      color: "bg-gradient-to-br from-blue-300 to-blue-500",
      hoverColor: "bg-gradient-to-br from-blue-800 hover:to-blue-600",
    },
  ];

  return (
    <SideBar>
      <h1 className="text-3xl font-bold">
        Hello!!{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Kamawich
        </span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 grid-flow-row gap-4 py-10">
        {CardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      {/* My Tasks */}
      <div className="grid grid-cols-1 grid-flow-row gap-4 py-10">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <div className="grid grid-cols-1 grid-flow-row gap-4">
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h1 className="text-2xl font-bold">Task 1</h1>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Dashboard;
