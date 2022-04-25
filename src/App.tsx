import React, { useContext } from "react";
import { Redirect, useRoutes } from "raviger";
import { About, Boards, Dashboard, Landing, SignIn, SignUp, Todo } from "./pages";
import Container from "./common/Container";
import ProtectRoute from "./common/ProtectedRoute";
import { UserLoginContext } from "./context/UserLoginContext";
import DetailedBoard from "./pages/DetailedBoard";

function App() {
  const { loggedIn } = useContext(UserLoginContext);

  const routes = {
    "/": () => <>{loggedIn ? <Dashboard /> : <Landing />}</>,
    "/about": () => <>{loggedIn ? <Redirect to="/" /> : <About />}</>,
    "/signin": () => <>{loggedIn ? <Redirect to="/" /> : <SignIn />}</>,
    "/signup": () => <>{loggedIn ? <Redirect to="/" /> : <SignUp />}</>,
    "/todo": () => (
      <ProtectRoute>
        <Todo />
      </ProtectRoute>
    ),
    "/board": () => (
      <ProtectRoute>
        <Boards />
      </ProtectRoute>
    ),
    "/board/:boardId": ({ boardId }: { boardId: string }) => (
      <ProtectRoute>
        <DetailedBoard boardId={boardId} />
      </ProtectRoute>
    ),
  };

  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default App;
