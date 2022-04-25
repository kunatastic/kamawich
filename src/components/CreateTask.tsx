import React, { useState } from "react";
import { BoardType, CreateTaskType, StatusType } from "../types/AppTypes";
import { postTask } from "../utils/ApiUtils";

function CreateTask(props: {
  onCloseCB: () => void;
  board: BoardType;
  statusList: StatusType[];
  // setBoardList: React.Dispatch<React.SetStateAction<BoardType[]>>;
}) {
  // const { board, statusList, onCloseCB, setBoardList } = props;
  const { board, statusList, onCloseCB } = props;
  const [taskCreationError, setTaskCreationError] = useState(false);

  const [formData, setFormData] = useState<CreateTaskType>({
    board_object: board,
    title: "",
    description: "",
    status_object: {} as StatusType,
    board: board.id,
    status: -1,
  });

  async function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (formData.status === -1) {
      setTaskCreationError(true);
      return;
    }
    try {
      console.log(formData);
      const data = await postTask(board.id, formData);
      onCloseCB();
      setTaskCreationError(false);
      // setBoardList((prevState) => [...prevState, data]);
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold py-5">Add a new task</h1>
      <form onSubmit={formSubmitHandler}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="title">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              className="border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
              placeholder="Enter your title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="description">
              Description <span className="text-red-600">*</span>
            </label>
            <input
              id="description"
              type="text"
              className="border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
              placeholder="Enter your description"
              value={formData.description}
              required
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="status">
              Status <span className="text-red-600">*</span>
            </label>
            {taskCreationError && (
              <div className="text-red-600 border border-red-600 bg-red-50 py-3 rounded px-4 text-md my-2">
                Please select a status
              </div>
            )}
            <select
              id="status"
              className="border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
              value={formData.status}
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  status: parseInt(e.target.value),
                  status_object: statusList.find(
                    (status) => status.id.toString() === e.target.value
                  ) as StatusType,
                });
                console.log(formData);
              }}
            >
              <option value="-1">Select a status</option>
              {statusList.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button
              type="submit"
              className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-gray-900 hover:bg-gray-800 w-full"
            >
              Create task
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateTask;
