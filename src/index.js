import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import Board from "./boardComponent";
import Boards from "./boards";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <Router>
        <Header />
        <Switch>
          <Route component={Boards} exact path="/" />
          <Route component={Board} path="/board/:boardId" />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
