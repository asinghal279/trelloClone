import React, { Component } from "react";
import {
  Stack,
  Box,
  Heading,
  PseudoBox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverCloseButton,
  IconButton,
} from "@chakra-ui/core";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      newBoard: "",
      popOpen: false,
      isOpen: false,
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  getBoards = () => {
    Axios.get(
      `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const boards = res.data;
        this.setState({ boards });
      })
      .catch((err) => console.log(err));
  };

  submitNewBoard = (e) => {
    e.preventDefault();
    Axios.post(
      `https://api.trello.com/1/boards/?key=${this.key}&token=${this.token}&name=${this.state.newBoard}`
    )
      .then((response) => {
        console.log(response);
        this.setState({
          boards: [...this.state.boards, response.data],
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getBoards();
  }

  handleInput = (e) => {
    this.setState({
      newBoard: e.target.value,
    });
  };

  deleteBoard = (id) => {
    Axios.delete(
      `https://api.trello.com/1/boards/${id}?key=${this.key}&token=${this.token}`
    )
      .then((response) => {
        console.log(response);
        this.getBoards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onOpen = () => this.setState({ isOpen: true });
  onClose = () => this.setState({ isOpen: false });

  render() {
    return (
      <Stack w="65%" mx="auto">
        <Modal
          bg="transparent"
          blockScrollOnMount={false}
          isOpen={this.state.isOpen}
          onClose={this.onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton cursor="pointer" />
            <form>
              <ModalBody pb={6} display="flex">
                <FormControl>
                  <Input
                    placeholder="Add Board Title"
                    value={this.state.newBoard}
                    onChange={this.handleInput}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  mr={3}
                  type="submit"
                  cursor="pointer"
                  border="none"
                  onClick={this.submitNewBoard}
                >
                  Create Board
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Heading
          as="h4"
          color="#172b4d"
          fontSize="1.2em"
          my={4}
          w="100%"
          size="md"
          textAlign="left"
        >
          <Box
            as={AiOutlineUser}
            mr={2}
            verticalAlign="text-bottom"
            display="inline"
          />
          Personal Boards
        </Heading>

        <Stack spacing={3} isInline display="flex" flexWrap="wrap">
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
                key={board.id}
              >
                <PseudoBox
                  key={board.id}
                  as="button"
                  display="flex"
                  p={2}
                  mx={2}
                  fontWeight={600}
                  fontSize="1em"
                  textAlign="left"
                  alignItems="top"
                  borderRadius={5}
                  id={board.id}
                  border="none"
                  w={200}
                  h={100}
                  cursor="pointer"
                  color="white"
                  mt={3}
                  bg="#0567a2"
                  _hover={{ bg: "#065a8e" }}
                  position="relative"
                >
                  {board.name}

                  <Box onClick={(e) => e.preventDefault()}>
                    <Popover placement="bottom-start" trigger="hover">
                      <PopoverTrigger>
                        <IconButton
                          position="absolute"
                          bottom={2}
                          bg="transparent"
                          right={1}
                          icon="drag-handle"
                          size="22px"
                          color="#fff"
                          _focus={{ bg: "transparent" }}
                        />
                      </PopoverTrigger>
                      <PopoverContent zIndex={4}>
                        <PopoverHeader
                          fontSize={16}
                          textAlign="center"
                          fontWeight={300}
                          color="#0567a2"
                        >
                          Delete Board?
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverFooter>
                          <Button
                            variantColor="red"
                            w="100%"
                            size="sm"
                            onClick={() => this.deleteBoard(board.id)}
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </PseudoBox>
              </Link>
            );
          })}

          <PseudoBox
            as="button"
            display="flex"
            mt={3}
            p={2}
            mx={2}
            fontSize="0.8em"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            borderRadius={5}
            border="none"
            w={200}
            h={100}
            cursor="pointer"
            onClick={this.onOpen}
            color="#172b4d"
            bg="#f1f2f5"
            _hover={{ bg: "#e7e9ed" }}
          >
            Create New Board
          </PseudoBox>
        </Stack>
      </Stack>
    );
  }
}
