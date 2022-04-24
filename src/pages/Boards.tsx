import React from "react";
import SideBar from "../components/SideBar";

function Boards() {
  return (
    <SideBar>
      <h1 className="text-3xl font-bold">My Boards.!</h1>

      {/* Filter section */}
      <section className="flex justify-between pt-10">
        <button className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700">
          Filter
        </button>
        <button className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700">
          New Board
        </button>
      </section>

      {/* Cards Section */}
      <section></section>
    </SideBar>
  );
}

export default Boards;
