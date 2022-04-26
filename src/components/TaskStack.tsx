import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { PER_CARD_WIDTH } from "../config";
import { BoardType, StatusType, TaskResponseType, TaskType } from "../types/AppTypes";
import { getListTasks } from "../utils/ApiUtils";
import CreateTask from "./CreateTask";

function TaskStack(props: {
  taskList: TaskType[];
  board: BoardType;
  statusId: string;
  setNewTasks: (statusId: string, results: TaskType[]) => void;
  statusList: StatusType[];
}) {
  const { taskList, setNewTasks, board, statusId, statusList } = props;

  async function getAllTasks() {
    try {
      const data: TaskResponseType = await getListTasks(board.id, statusId);
      setNewTasks(statusId, data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState<{
    show: boolean;
    item: number;
  }>({ show: false, item: -1 });

  if (taskList)
    return (
      <div className="">
        {taskList.map((task, index) => (
          <div
            key={index}
            className="bg-red-100 border border-red-500 h-full my-2 py-5 cursor-pointer font-semibold text-center rounded"
            style={{
              width: `${PER_CARD_WIDTH}px`,
            }}
            onClick={() => setShowUpdateStatusModal({ show: true, item: index })}
          >
            <h3 className="text-xl">{task.title}</h3>
            <h3 className="font-light">{task.description}</h3>
          </div>
        ))}

        {showUpdateStatusModal.show && (
          <Modal
            onCloseCB={() => setShowUpdateStatusModal({ ...showUpdateStatusModal, show: false })}
          >
            <CreateTask
              statusList={statusList}
              board={board}
              onCloseCB={() => setShowUpdateStatusModal({ ...showUpdateStatusModal, show: false })}
              initialStatus={taskList[showUpdateStatusModal.item]}
            />
          </Modal>
        )}
      </div>
    );
  return null;
}

export default TaskStack;
