import React from "react";
import ReactDOM from "react-dom";
import FuncComp from "./boardWrapper";
import Header from "./header";
import Board from "./boardComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Route component={FuncComp} exact path="/" />
      <Route component={Board} path="/board/:boardId" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
