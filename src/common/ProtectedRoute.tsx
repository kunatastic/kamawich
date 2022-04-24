import React, { useContext } from "react";
import { UserLoginContext } from "../context/UserLoginContext";

function ProtectRoute(props: { children: JSX.Element }) {
  const { loggedIn } = useContext(UserLoginContext);
  if (loggedIn) {
    return props.children;
  }
  return <div>Kindly Login to Continue</div>;
}

export default ProtectRoute;
