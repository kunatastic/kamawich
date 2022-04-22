import React from "react";
import { useRoutes } from "raviger";
import { About, Dashboard, Landing, SignIn, SignUp } from "./pages";
import Container from "./common/Container";
const routes = {
  "/": () => <Landing />,
  "/about": () => <About />,
  "/signin": () => <SignIn />,
  "/signup": () => <SignUp />,
  "/dashboard": () => <Dashboard />,
};

function App() {
  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default App;
