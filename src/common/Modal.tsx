import React, { useRef, useEffect } from "react";

export default function Modal(props: { children: React.ReactNode; onCloseCB: () => void }) {
  const { children, onCloseCB } = props;
  const myRef = useRef<any>();

  const handleClickOutside = (e: any) => {
    if (!myRef.current.contains(e.target)) {
      onCloseCB();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      <div className="absolute h-screen w-full bg-black bg-opacity-60 top-0 left-0 z-40">
        <div className="flex justify-center items-center h-full z-50">
          <div
            className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
            ref={myRef}
          >
            <div className="bg-white px-6 py-5 pb-4">{children}</div>
          </div>
        </div>
      </div>
      {/* <div>{props.children}</div> */}
    </>
  );
}
