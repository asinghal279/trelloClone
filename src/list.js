import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Stack,
  IconButton,
  Textarea,
} from "@chakra-ui/core";
import Axios from "axios";
import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      listName: this.props.name,
      listDisabled: true,
      showAddCardForm: false,
      showAddCardButton: true,
      newCard: "",
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  getCards = () => {
    Axios.get(
      `https://api.trello.com/1/lists/${this.props.id}/cards?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const cards = res.data;
        this.setState({ cards });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCards();
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitListNameChange = () => {
    Axios.put(
      `https://api.trello.com/1/lists/${this.props.id}?key=${this.key}&token=${this.token}`,
      {
        name: this.state.listName,
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submitNewCard = (e) => {
    e.preventDefault();
    Axios.post(
      `https://api.trello.com/1/cards?key=${this.key}&token=${this.token}&idList=${this.props.id}`,
      {
        name: this.state.newCard,
      }
    )
      .then((response) => {
        console.log(response);
        this.setState({
          showAddCardButton:true,
          showAddCardForm:false,
          newCard: "",
        })
        this.getCards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Box
        w={280}
        bg="#ebecf0"
        borderRadius={10}
        m={3}
        p={2}
        pt={1}
        pb={2}
        h="fit-content"
      >
        <Input
          size="sm"
          mb={2}
          p="10px"
          value={this.state.listName}
          borderRadius={2}
          bg="transparent"
          border="none"
          fontSize={18}
          id="listName"
          onChange={this.handleInputChange}
          onBlur={this.submitListNameChange}
        />
        <Stack>
          {this.state.cards.map((card) => (
            <Box
              key={card.id}
              p="4px"
              bg="white"
              borderRadius={3}
              fontSize={16}
              boxShadow="0 1px 0 rgba(9,30,66,.25)"
              cursor="pointer"
              onClick={this.props.openModal}
            >
              {card.name}
            </Box>
          ))}
        </Stack>
        <form>
          <FormControl
            onSubmit={this.submitNewCard}
            display={this.state.showAddCardForm ? "block" : "none"}
            mt={2}
          >
            <Textarea
              placeholder="Enter a title for this card..."
              borderRadius={5}
              resize="none"
              p="6px 8px 2px"
              id="newCard"
              boxShadow="0 1px 0 rgba(9,30,66,.25)"
              value={this.state.newCard}
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
              >
                Add Card
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
                    showAddCardButton: true,
                    showAddCardForm: false,
                  });
                }}
              />
            </ButtonGroup>
          </FormControl>
        </form>
        <Button
          size="xs"
          w="100%"
          mt={2}
          border="none"
          fontWeight="300"
          color="#747f94"
          textAlign="left"
          onClick={() => {
            this.setState({ showAddCardForm: true, showAddCardButton: false });
          }}
          display={this.state.showAddCardButton ? "block" : "none"}
        >
          + Add a card
        </Button>
      </Box>
    );
  }
}

export default List;
