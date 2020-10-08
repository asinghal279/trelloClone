import React, { Component } from "react";
import { Box } from "@chakra-ui/core";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export class header extends Component {
  render() {
    return (
      <Box bg="#0567a2" display="flex" px={2}>
        <Box display="flex" alignItems="center">
          <Box
            bg="#ffffff4d"
            textAlign="center"
            color="white"
            p="6px"
            as={BsFillGrid3X3GapFill}
            borderRadius={5}
            size={10}
            my="2px"
            mx="2px"
          />
          <Link to="/">
            <Box
              bg="#ffffff4d"
              textAlign="center"
              color="white"
              p="6px"
              borderRadius={5}
              as={AiOutlineHome}
              size={10}
              mx="2px"
            />
          </Link>
          <Box
            bg="#ffffff4d"
            textAlign="center"
            color="white"
            p="6px"
            
            borderRadius={5}
            mx="2px"
            my="2px"

          >
            Boards
          </Box>
        </Box>
      </Box>
    );
  }
}

export default header;
