import React from "react";

function Container(props: { children: React.ReactNode }) {
  const { children } = props;
  return <div className="bg-background min-h-screen text-[#000411] leading-3">{children}</div>;
}

export default Container;
