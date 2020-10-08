import React, { Component } from "react";
import axios from "axios";
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
} from "@chakra-ui/core";
import { AiOutlineUser } from "react-icons/ai";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      newBoard: "",
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  getBoards = () => {
    axios
      .get(
        `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`
      )
      .then((res) => {
        const boards = res.data;
        this.setState({ boards });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  submitNewBoard = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.trello.com/1/boards/?key=${this.key}&token=${this.token}&name=${this.state.newBoard}`
      )
      .then((res) => this.getBoards())
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

  render() {
    return (
      <Stack w="65%" mx="auto">
        <Modal
          bg="transparent"
          blockScrollOnMount={false}
          isOpen={this.props.disclosure.isOpen}
          onClose={this.props.disclosure.onClose}
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
          <Box as={AiOutlineUser} mr={2} verticalAlign="text-bottom" display="inline"/>
          Personal Boards
        </Heading>

        <Stack spacing={3} isInline display="flex" flexWrap="wrap">
          {this.state.boards.map((board) => {
            let path = `/board/${board.id}`;
            return (
              <Link to={{
                pathname: path,
                state:{
                  name: board.name,
                }
              }}>
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
                >
                  {board.name}
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
            onClick={this.props.disclosure.onOpen}
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
