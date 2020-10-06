import { useDisclosure, ThemeProvider } from "@chakra-ui/core";
import Boards from "./boards";
import React from "react";

const FuncComp = () => {
  const k = useDisclosure();

  return (
    <ThemeProvider>
      <Boards disclosure={k} />
    </ThemeProvider>
  );
};

export default FuncComp;
