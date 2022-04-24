import React, { useContext } from "react";
import { Redirect, useRoutes } from "raviger";
import { About, Boards, Dashboard, Landing, SignIn, SignUp, Todo } from "./pages";
import Container from "./common/Container";
import ProtectRoute from "./common/ProtectedRoute";
import { UserLoginContext } from "./context/UserLoginContext";

function App() {
  const { user, loggedIn } = useContext(UserLoginContext);

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
    "/boards": () => (
      <ProtectRoute>
        <Boards />
      </ProtectRoute>
    ),
  };

  console.log(user);

  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default App;
