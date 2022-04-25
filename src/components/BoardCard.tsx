import React, { useState } from "react";
import { BoardType } from "../types/AppTypes";
import { formatServerTime } from "../utils/TimeUtil";

function BoardCard(props: BoardType) {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <div
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full bg-gradient-to-br from-gray-600 via-gray-900 to-gray-800"
        // style={{ background: getColor(board.created_date) + OPACITY }}
      >
        <div className="flex justify-between items-center relative">
          <h1 className="text-3xl text-white font-bold">{props.title}</h1>
          {/* <h1
            className="text-3xl text-white font-bold"
            // onClick={() => setShowDropDown(!showDropDown)}
            // onMouseLeave={() => setShowDropDown(false)}
            // onMouseEnter={() => setShowDropDown(true)}
          >
            opt
          </h1> */}
          {/* {showDropDown && (
            <div
              x-show="open"
              className="absolute right-0 w-48 py-2 mt-2 bg-gray-100 rounded-md shadow-xl"
            >
              <div className="items-center">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  Update
                </div>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-white">
                  Delete
                </div>
              </div>
            </div>
          )} */}
          {/* <div className="p-10">
            <div className="dropdown inline-block relative">
              <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">Dropdown</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className="">
                  <div className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    One
                  </div>
                </li>
                <li className="">
                  <div className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    Two
                  </div>
                </li>
                <li className="">
                  <div className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    Three is the magic number
                  </div>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <p className="text-white font-2xl text-base mt-5">{props?.description}</p>
        <p className="text-gray-200 text-base">
          Created on <span className="underline">{formatServerTime(props.created_date)}</span>
        </p>
      </div>
    </>
  );
}

export default BoardCard;
