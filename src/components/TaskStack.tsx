import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { PER_CARD_WIDTH } from "../config";
import { BoardType, StatusType, TaskResponseType, TaskType } from "../types/AppTypes";
import { getListTasks } from "../utils/ApiUtils";
import CreateStatus from "./CreateStatus";

function TaskStack(props: { status: StatusType; board: BoardType }) {
  const { status, board } = props;

  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  async function getAllTasks() {
    try {
      const data: TaskResponseType = await getListTasks(board.id, status.id);
      setTaskList(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="flex-shrink-0 h-full">
      <div
        key={status.id}
        className="bg-green-100 border border-green-500 h-full py-5 font-semibold text-center rounded"
        style={{
          width: `${PER_CARD_WIDTH}px`,
        }}
        onClick={() => setShowUpdateStatusModal(true)}
      >
        <h3 className="text-xl">{status.title}</h3>
        <h3 className="font-light">{status?.description}</h3>
      </div>

      {showUpdateStatusModal && (
        <Modal onCloseCB={() => setShowUpdateStatusModal(false)}>
          {/* <CreateStatus board={board} onCloseCB={() => setShowUpdateStatusModal(false)} /> */}
        </Modal>
      )}

      {taskList.map((task) => (
        <div
          key={task.id}
          className="bg-red-100 border border-red-500 h-full my-2 py-5 font-semibold text-center rounded"
          style={{
            width: `${PER_CARD_WIDTH}px`,
          }}
        >
          <h3 className="text-xl">{task.title}</h3>
          <h3 className="font-light">{task.description}</h3>
        </div>
      ))}
    </div>
  );
}

export default TaskStack;
