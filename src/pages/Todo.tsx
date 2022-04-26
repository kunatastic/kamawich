import { Link } from "raviger";
import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { TaskResponseType, TaskType } from "../types/AppTypes";
import { getAllTasks } from "../utils/ApiUtils";

function Todo() {
  const [listView, setListView] = React.useState(true);
  const [todoViewList, setTodoViewList] = React.useState<TaskType[]>([]);

  async function getTodoItems() {
    const data: TaskResponseType = await getAllTasks();
    // add to todo view list if status is not comepleted
    setTodoViewList(
      data.results.filter((result) =>
        result.status_object.title.toLowerCase() !== "completed" ? result : null
      )
    );
  }

  useEffect(() => {
    getTodoItems();
  }, []);

  return (
    <SideBar>
      <h1 className="text-3xl font-bold">To Do!</h1>
      {/* Filter section */}
      <section className="flex justify-between pt-10">
        <div className="">
          <button className="w-32 mr-5 text-center py-3 rounded border-2 border-gray-700 text-gray-700">
            Filter
          </button>
          <button className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700">
            Today
          </button>
        </div>
        <div>
          <button
            className={`w-32 mr-5 text-center py-3 rounded border-2 border-gray-700 
            ${
              listView
                ? "bg-gray-700 text-white hover:bg-gray-800"
                : "hover:bg-gray-200 text-gray-700"
            }
            `}
            onClick={() => setListView(true)}
          >
            List
          </button>
          <button
            className={`w-32 mr-5 text-center py-3 rounded border-2 border-gray-700 
            ${
              !listView
                ? "bg-gray-700 text-white hover:bg-gray-800"
                : "hover:bg-gray-200 text-gray-700"
            }
            `}
            onClick={() => setListView(false)}
          >
            Grid
          </button>
        </div>
      </section>

      <section className="py-10">
        {listView && (
          <>
            <div className="grid grid-cols-1 grid-flow-row gap-4 py-10">
              <div className="bg-gray-800 text-gray-100 shadow rounded p-4 grid grid-cols-3">
                <h1 className="text-xl font-extrabold text-center">Task Details</h1>
                <h1 className="text-xl font-extrabold text-center">Board Details</h1>
                <h1 className="text-xl font-extrabold text-center">Status</h1>
              </div>
              {todoViewList.length === 0 && (
                <h1 className="text-3xl text-center py-5">No task present...</h1>
              )}
              {todoViewList.map((task, index) => (
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
          </>
        )}
      </section>
    </SideBar>
  );
}

export default Todo;
