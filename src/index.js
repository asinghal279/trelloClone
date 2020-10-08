import React from "react";
import ReactDOM from "react-dom";
import FuncComp from "./boardWrapper";
import Header from "./header";
import Board from "./boardComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <Router>
        <Header />
        <Route component={FuncComp} exact path="/" />
        <Route component={Board} path="/board/:boardId" />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
