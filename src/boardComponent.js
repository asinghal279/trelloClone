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
  FormLabel,
  Input,
  Button,
  ThemeProvider,
  CSSReset,
} from "@chakra-ui/core";
import Axios from "axios";
import List from "./list";

export class BoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardName: this.props.location.state.name,
      lists: [],
      disabled: true,
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
    this.boardID = `5c3775cffd352b84534b75a0`;
  }

  getlists = () => {
    Axios.get(
      `https://api.trello.com/1/boards/${this.props.match.params.boardId}/lists?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const lists = res.data;
        this.setState({ lists });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleBoardName = (e) => {
    this.setState({
      boardName: e.target.value,
    });
  };

  enableInput = () => {
    this.setState({
      disabled: false,
    });
  };

  handleBlur = () => {
    this.setState({
      disabled: true,
    });
    Axios.put(
      `https://api.trello.com/1/boards/${this.props.match.params.boardId}?key=${this.key}&token=${this.token}`,
      {
        name: this.state.boardName,
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getlists();
  }

  render() {
    console.log(this.props.match.params);
    return (
        <React.Fragment>
        <Box bg="#0079bf">
          <FormControl w="20%" h="100%" p={2}>
            <Input
              placeholder="Add Board Title"
              h="60%"
              onChange={this.handleBoardName}
              onClick={this.enableInput}
              value={this.state.boardName}
              border="none"
              _disabled={this.state.disabled ? "disabled" : null}
              color="white"
              bg={this.state.disabled ? "transparent" : "#ffffff4d"}
              size={25}
              fontSize={24}
              fontWeight={900}
              pl={1}
              onBlur={this.handleBlur}
            />
          </FormControl>
        </Box>
        <Stack isInline>
          {this.state.lists.map((list) => (
            <List key={list.id} id={list.id} name={list.name}></List>
          ))}
        </Stack>
        </React.Fragment>
    );
  }
}

export default BoardComponent;
