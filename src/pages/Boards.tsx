import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import BoardCard from "../components/BoardCard";
import CreateBoard from "../components/CreateBoard";
import SideBar from "../components/SideBar";
import { OPACITY } from "../config";
import { BoardResponseType, BoardType } from "../types/AppTypes";
import { getListBoards, postBoard } from "../utils/ApiUtils";
import { formatServerTime } from "../utils/TimeUtil";

function Boards() {
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState(true);

  async function getBoardListData() {
    try {
      const data: BoardResponseType = await getListBoards();
      setBoardList(data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBoardListData();
  }, []);

  return (
    <SideBar>
      <h1 className="text-3xl font-bold">My Boards.!</h1>
      {/* Filter section */}
      <section className="flex justify-between pt-10">
        <button className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700">
          Filter
        </button>
        <button
          className="w-32 text-center py-3 rounded border-2 border-gray-700 text-gray-700"
          onClick={() => {
            setNewBoardModal(true);
          }}
        >
          New Board
        </button>
      </section>
      {/* Cards Section */}
      <section className="py-10 px-5 mt-10 border-transparent border-t-blue-500 border-2">
        {loading && <div className="text-3xl text-center w-full font-bold">Loading...</div>}
        <div className="grid grid-cols-3 gap-8">
          {boardList.map((board, index) => (
            <Link href={`/board/${board.id}/`}>
              <BoardCard key={index} {...board} />
            </Link>
          ))}
        </div>
      </section>

      {/* Modal */}
      {newBoardModal && (
        <Modal onCloseCB={() => setNewBoardModal(false)}>
          <CreateBoard onCloseCB={() => setNewBoardModal(false)} setBoardList={setBoardList} />
        </Modal>
      )}
    </SideBar>
  );
}

export default Boards;
