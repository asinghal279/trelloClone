import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/core";
import Axios from "axios";
import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
        cards: []
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

  render() {
    return (
      <Box w={280} bg="#ebecf0" borderRadius={10} m={3} p={1} pt={1} pb={3} h="fit-content">
        <Heading size="sm" p="10px" m={0}>{this.props.name}</Heading>
        <Stack>
            {this.state.cards.map(card => (
                <Box key={card.id} p="6px" bg="white" borderRadius={3} fontSize={2} boxShadow="0 1px 0 rgba(9,30,66,.25)" cursor="pointer">
                    {card.name}
                </Box>
            ))}
        </Stack>
        {/* <form>
          <FormControl>
            <Input placeholder="Add new Card"></Input>
          </FormControl>
        </form> */}
        {/* <Button>+ Add a card</Button> */}
      </Box>
    );
  }
}

export default List;
