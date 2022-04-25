import React, { useState } from "react";
import {} from "../types/AppTypes";
import { postStatus } from "../utils/ApiUtils";

function CreateTask(props: {
  onCloseCB: () => void;
  // setBoardList: React.Dispatch<React.SetStateAction<BoardType[]>>;
}) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  async function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      const data = await postStatus(formData);
      props.onCloseCB();
      // props.setBoardList((prevState) => [...prevState, data]);
      console.log(data);
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
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">
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
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
              placeholder="Enter your description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button
              type="submit"
              className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-gray-900 hover:bg-gray-800 w-full"
            >
              Create Board
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateTask;
