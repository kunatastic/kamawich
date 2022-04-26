import { Link } from "raviger";
import React, { useEffect } from "react";
import Card from "../components/Card";
import SideBar from "../components/SideBar";
import { TaskResponseType, TaskType } from "../types/AppTypes";
import { getAllTasks } from "../utils/ApiUtils";

function Dashboard() {
  const [completed, setCompleted] = React.useState(5);
  const [total, setTotal] = React.useState(6);

  const [dashboardTasks, setDashboardTasks] = React.useState<TaskType[]>([]);

  const CardData = [
    {
      title: "Completed Tasks",
      count: completed,
      color: "bg-gradient-to-br from-green-400 to-green-300",
      hoverColor: "bg-gradient-to-br from-green-800 hover:to-green-600",
    },
    {
      title: "Incomplete Tasks",
      count: total - completed,
      color: "bg-gradient-to-br from-red-400 to-red-300",
      hoverColor: "bg-gradient-to-br from-red-800 hover:to-red-600",
    },
    {
      title: "Total Tasks",
      count: total,
      color: "bg-gradient-to-br from-blue-400 to-blue-300",
      hoverColor: "bg-gradient-to-br from-blue-800 hover:to-blue-600",
    },
  ];

  async function getDashboardData() {
    const tasks: TaskResponseType = await getAllTasks();
    console.log("Tasks", tasks);
    setTotal(tasks.count);
    setDashboardTasks(tasks.results);

    // Count the status of completed tasks
    let completedCount = 0;
    tasks.results.forEach((task) => {
      if (task.status_object.title.toLowerCase() === "completed") {
        completedCount++;
      }
    });
    setCompleted(completedCount);
  }

  // function chooseRandomNumber() {
  //   const randomNumber = Math.floor(Math.random() * 100);
  //   return randomNumber;
  // }

  useEffect(() => {
    getDashboardData();
  }, []);

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
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <div className="bg-gray-800 text-gray-100 shadow rounded p-4 grid grid-cols-3">
          <h1 className="text-xl font-extrabold text-center">Task Details</h1>
          <h1 className="text-xl font-extrabold text-center">Board Details</h1>
          <h1 className="text-xl font-extrabold text-center">Status</h1>
        </div>

        {total === 0 && <h1 className="text-3xl text-center">No task present...</h1>}

        {dashboardTasks.map((task, index) => (
          <React.Fragment key={index}>
            <Link href={`/board/${task.board}`}>
              <div className="bg-gray-200 hover:bg-gray-300 shadow rounded p-4 grid grid-cols-3">
                <div className="text-center">
                  <h1 className="text-xl font-semibold">{task.title}</h1>
                  <p className="text-gray-700">{task.description}</p>
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-semibold">{task.board_object.title}</h1>
                  <p className="text-gray-700">{task.board_object.title}</p>
                </div>
                <div className="text-center">
                  <h1 className="">{task.status_object.title}</h1>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </SideBar>
  );
}

export default Dashboard;
