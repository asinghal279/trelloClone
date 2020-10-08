import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  ThemeProvider,
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

  handleListNameChange = (e) => {
    this.setState({
      listName: e.target.value,
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

  render() {
    return (
      <Box
        w={280}
        bg="#ebecf0"
        borderRadius={10}
        m={3}
        p={1}
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
          onChange={this.handleListNameChange}
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
            >
              {card.name}
            </Box>
          ))}
        </Stack>
        {/* <form>
          <FormControl>
            <Input placeholder="Add new Card"></Input>
          </FormControl>
        </form> */}
        <Button
          size="xs"
          w="100%"
          mt={2}
          border="none"
          fontWeight="300"
          color="#747f94"
          textAlign="left"
        >
          + Add a card
        </Button>
      </Box>
    );
  }
}

export default List;
