import React from "react";

function Card(props: { color: string; hoverColor: string; title: string; count: number }) {
  const { color, hoverColor, title, count } = props;
  return (
    <>
      <div className="col-span-1">
        <div
          className={`rounded-2xl shadow-xl p-5 ${color} ${hoverColor} hover:shadow-md bg-opacity-20`}
        >
          <h1 className="text-3xl font-semibold pt-4">{title}</h1>
          <h1 className="text-2xl font-semibold pt-3">{count}</h1>
          <h1 className="pb-3">Task Count</h1>
        </div>
      </div>
    </>
  );
}

export default Card;
