import React, { Component } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Stack,
} from "@chakra-ui/core";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Axios from "axios";
import Logo from './trello-logo-blue.png';

export class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      boards: [],
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  onOpen = () => {
    this.setState({ isOpen: true });
    this.getBoards();
  };
  onClose = () => {
    this.setState({ isOpen: false });
  };

  getBoards = () => {
    Axios.get(
      `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const boards = res.data;
        this.setState({ boards });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Flex bg="#0567a2" px={2} justify="space-between" alignItems="center"> 
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
            onClick={this.onOpen}
            cursor="pointer"
          >
            Boards
          </Box>
        </Box>
        <Drawer
          isOpen={this.state.isOpen}
          placement="left"
          onClose={this.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Boards</DrawerHeader>

            <DrawerBody>
              <Stack>
                {this.state.boards.map((board) => {
                  let path = `/board/${board.id}`;
                  return (
                    <Link
                      to={{
                        pathname: path,
                        state: {
                          name: board.name,
                        },
                      }}
                    >
                      <Button w="100%" my={3}>
                        {board.name}
                      </Button>
                    </Link>
                  );
                })}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box size="xs" w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
          <Image src={Logo} w="100px" alt="Segun Adebayo" />
        </Box>
        <Box borderRadius="33px" bg="#2ea3bf" p="10px" m="4px">RS</Box>
      </Flex>
    );
  }
}

export default header;
