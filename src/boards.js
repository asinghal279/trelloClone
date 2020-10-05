import React, { Component } from "react";
import axios from "axios";
import { Stack, Box, Heading, PseudoBox } from "@chakra-ui/core";
import { AiOutlineUser } from "react-icons/ai";

export class boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <Stack w="65%" mx="auto">
        <Heading
          as="h4"
          color="#172b4d"
          fontSize="1.2em"
          w="100%"
          size="md"
          textAlign="left"
        >
          <Box as={AiOutlineUser} mr={2} verticalAlign="text-bottom" />
          Personal Boards
        </Heading>
        <Stack spacing={3} isInline display="flex" flexWrap="wrap">
          {this.state.boards.map((board) => {
            return (
              <PseudoBox
                key={board.id}
                as="button"
                display="flex"
                p={2}
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
            );
          })}
          <PseudoBox
            as="button"
            display="flex"
            mt={3}
            p={2}
            fontSize="0.8em"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            borderRadius={5}
            border="none"
            w={200}
            h={100}
            cursor="pointer"
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

export default boards;
