import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import CreateStatus from "../components/CreateStatus";
import CreateTask from "../components/CreateTask";
import SideBar from "../components/SideBar";
import TaskStack from "../components/TaskStack";
import { PER_CARD_WIDTH } from "../config";
import { BoardType, StatusResponseType, StatusType } from "../types/AppTypes";
import { getListStatus, getUniqueBoard } from "../utils/ApiUtils";

function DetailedBoard(props: { boardId: string }) {
  const { boardId } = props;
  const [boardData, setBoardData] = useState<BoardType | null>(null);
  const [statusList, setStatusList] = useState<StatusType[]>([]);
  const [pageDoNotExist, setPageDoNotExist] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newStatusModal, setNewStatusModal] = useState(false);

  async function getBoardData() {
    try {
      const data: BoardType = await getUniqueBoard(boardId);
      setBoardData(data);
    } catch (err) {
      console.log("ERROR");
      setPageDoNotExist(true);
    }
  }

  async function getStatusListData() {
    try {
      const data: StatusResponseType = await getListStatus();
      setStatusList(data.results);
    } catch (err) {
      console.log("ERROR");
      setPageDoNotExist(true);
    }
  }

  useEffect(() => {
    getBoardData();
    getStatusListData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageDoNotExist) {
    return (
      <SideBar>
        <h1 className="text-2xl border border-red-500 font-semibold p-5 mt-10 bg-red-100">
          The board you are fetching does not exists. It is either moved or deleted.
        </h1>
        <Link
          href="/"
          className="font-medium inline-flex mt-5 items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out px-8 py-3 shadow-lg text-white bg-gray-900 hover:bg-gray-800"
        >
          Go back home
        </Link>
      </SideBar>
    );
  }
  return (
    <>
      <SideBar>
        <h1 className="text-3xl font-bold">{boardData?.title}!</h1>
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
          <button
            className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700"
            onClick={() => {
              setNewTaskModal(true);
            }}
          >
            New Task
          </button>
        </section>

        {/* horizontal scroll section */}
        <section className="board-card flex overflow-x-auto overflow-y-hidden space-x-9 mt-10 py-4 px-2 scroll-smooth">
          {boardData &&
            statusList.map((status: StatusType) => (
              <TaskStack key={status.id} board={boardData} status={status} />
            ))}
          <div className="flex-shrink-0">
            <button
              style={{ width: `${PER_CARD_WIDTH}px` }}
              onClick={() => setNewStatusModal(true)}
              className="bg-blue-100 border border-blue-500 py-5 text-xl font-semibold text-center rounded"
            >
              Add new status
            </button>
          </div>
        </section>

        {/* Modal */}
        {newTaskModal && boardData && (
          <Modal onCloseCB={() => setNewTaskModal(false)}>
            <CreateTask
              statusList={statusList}
              board={boardData}
              onCloseCB={() => setNewTaskModal(false)}
            />
          </Modal>
        )}

        {newStatusModal && (
          <Modal onCloseCB={() => setNewStatusModal(false)}>
            <CreateStatus
              onCloseCB={() => setNewStatusModal(false)}
              setStatusList={setStatusList}
            />
          </Modal>
        )}
      </SideBar>
    </>
  );
}

export default DetailedBoard;
