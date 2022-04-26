import React, { useState } from "react";
import { CreateStatusType, StatusType } from "../types/AppTypes";
import { deleteStatus, postStatus, updateStatus } from "../utils/ApiUtils";

function CreateStatus(props: {
  onCloseCB: () => void;
  setStatusList: React.Dispatch<React.SetStateAction<StatusType[]>>;
  initialData?: StatusType;
}) {
  const { onCloseCB, setStatusList, initialData } = props;
  const [formData, setFormData] = useState<CreateStatusType>({
    title: initialData ? initialData.title : "",
    description: initialData ? initialData.description : "",
  });

  async function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      let data: StatusType;
      if (!initialData) {
        data = await postStatus(formData);
        setStatusList((prevState) => [...prevState, data]);
        onCloseCB();
      } else {
        data = await updateStatus(formData, initialData.id);
        setStatusList((prevState) => {
          const index = prevState.findIndex((status) => status.id === data.id);
          prevState[index] = data;
          return [...prevState];
        });
        onCloseCB();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteHandler(event: React.FormEvent) {
    event.preventDefault();
    try {
      if (initialData) {
        const data = await deleteStatus(initialData.id);
        console.log(data);
        setStatusList((prevState) => prevState.filter((status) => status.id !== initialData.id));
        onCloseCB();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold py-5">
        {!initialData ? "Add a new status" : "Update status"}
      </h1>
      <form onSubmit={formSubmitHandler}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              className="bg-blue-50 border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
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
              className="bg-blue-50 border border-gray-300 focus:border-gray-500 rounded py-3 px-4 placeholder-gray-500 w-full text-gray-800"
              placeholder="Enter your description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        {!initialData ? (
          <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
              <button
                type="submit"
                className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-gray-900 hover:bg-gray-800 w-full"
              >
                Create new status
              </button>
            </div>
          </div>
        ) : (
          <div className="flex -mx-3 mt-6">
            <div className="w-full px-3">
              <button
                type="submit"
                className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-gray-900 hover:bg-gray-800 w-full"
              >
                Update status
              </button>
            </div>
            <div className="w-full px-3">
              <button
                type="button"
                onClick={deleteHandler}
                className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-red-900 hover:bg-red-800 w-full"
              >
                Delete status
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default CreateStatus;
