import React from "react";
import { useRoutes } from "raviger";
import { About, Boards, Dashboard, Landing, SignIn, SignUp, Todo } from "./pages";
import Container from "./common/Container";
const routes = {
  "/": () => <Landing />,
  "/about": () => <About />,
  "/signin": () => <SignIn />,
  "/signup": () => <SignUp />,
  "/dashboard": () => <Dashboard />,
  "/todo": () => <Todo />,
  "/boards": () => <Boards />,
};

function App() {
  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default App;
