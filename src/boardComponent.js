import React, { Component } from "react";
import {
  Box,
  FormControl,
  Input,
  Button,
  ButtonGroup,
  Textarea,
  IconButton,
  Flex,
} from "@chakra-ui/core";
import Axios from "axios";
import List from "./list";
import CardModal from "./card";

export class BoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardName: this.props.location.state.name,
      lists: [],
      disabled: true,
      showAddListForm: false,
      showAddListButton: true,
      newListName: "",
      isOpen: false,
      selectedCardId: "",
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  onOpen = () => this.setState({ isOpen: true });
  onClose = () => this.setState({ isOpen: false });

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

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
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

  submitNewList = (e) => {
    e.preventDefault();
    Axios.post(
      `https://api.trello.com/1/lists?key=${this.key}&token=${this.token}&name=${this.state.newListName}&idBoard=${this.props.match.params.boardId}`,
      {
        pos: "bottom",
      }
    )
      .then((response) => {
        console.log(response);
        this.setState({
          showAddCardButton: true,
          showAddCardForm: false,
          newListName: "",
        });
        this.getlists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getlists();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.boardId !== prevProps.match.params.boardId) {
      this.setState({ boardName: this.props.location.state.name });
      this.getlists();

      // or any other logic..
    }
  }

  render() {
    // console.log(this.props.match.params);
    return (
      <React.Fragment>
        <CardModal
          open={this.state.isOpen}
          close={this.onClose}
          cardId={this.state.selectedCardId}
        />
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
        <Flex overflow="auto" display="-webkit-box" h="-webkit-fill-available">
          {this.state.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              name={list.name}
              openModal={(cardId) => {
                // this.onOpen();
                this.setState({
                  selectedCardId: cardId,
                  isOpen: true,
                });
              }}
            ></List>
          ))}
          <form onSubmit={this.submitNewList}>
            <FormControl
              display={this.state.showAddListForm ? "block" : "none"}
              w={280}
              m={3}
            >
              <Textarea
                placeholder="Enter list title..."
                borderRadius={5}
                resize="none"
                p="6px 8px 2px"
                id="newListName"
                boxShadow="0 1px 0 rgba(9,30,66,.25)"
                value={this.state.newListName}
                onChange={this.handleInputChange}
                isRequired="true"
              />
              <ButtonGroup spacing={4} mt={2}>
                <Button
                  bg="#5aac44"
                  type="submit"
                  color="white"
                  type="submit"
                  fontWeight="300"
                  id="newCardInput"
                  size="sm"
                  _hover={{ bg: "#61bd4f" }}
                  variant="solid"
                  onClick={this.submitNewList}
                >
                  Add List
                </Button>
                <IconButton
                  border="none"
                  color="grey"
                  bg="transparent"
                  fontSize={16}
                  icon="close"
                  _hover={{ color: "black" }}
                  size="sm"
                  onClick={() => {
                    this.setState({
                      showAddListButton: true,
                      showAddListForm: false,
                    });
                  }}
                />
              </ButtonGroup>
            </FormControl>
            <Button
              size="xs"
              w={280}
              size="md"
              m={3}
              border="none"
              fontWeight="300"
              color="#747f94"
              textAlign="left"
              onClick={() => {
                this.setState({
                  showAddListForm: true,
                  showAddListButton: false,
                });
              }}
              display={this.state.showAddListButton ? "block" : "none"}
            >
              + Add a list
            </Button>
          </form>
        </Flex>
      </React.Fragment>
    );
  }
}

export default BoardComponent;
