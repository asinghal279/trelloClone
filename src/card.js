import React, { Component } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Icon,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Box,
  Heading,
  FormControl,
  Textarea,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/core";
import { BsWindow, BsCardText } from "react-icons/bs";
import Axios from "axios";

class cardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      open: false,
      showAddDescriptionForm: false,
      showAddDescriptionButton: true,
      description: "",
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  getCard = () => {
    // console.log(this.state.selectedCardId);
    Axios.get(
      `https://api.trello.com/1/cards/${this.props.cardId}?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const card = res.data;
        this.setState({
          name: card.name,
          description: card.desc,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.open != state.open) {
      return {
        open: props.open,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      this.getCard();
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  updateCard = (e) => {
    e.preventDefault();
    Axios.put(
      `https://api.trello.com/1/cards/${this.props.cardId}?key=${this.key}&token=${this.token}`,
      {
        name: this.state.name,
        desc: this.state.description,
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
      <Modal
        isOpen={this.state.open}
        onClose={this.props.close}
        size="xl"
        borderRadius="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justifyContent="space-between">
              <InputGroup>
                <InputLeftAddon
                  fontSize="1.4em"
                  bg="transparent"
                  border="none"
                  px={0}
                  children={<Icon as={BsWindow} color="#42526e" mt={2} />}
                />
                <Input
                  border="none"
                  value={this.state.name}
                  id="name"
                  fontSize="18px"
                  onChange={this.handleInputChange}
                  onBlur={this.updateCard}
                />
              </InputGroup>
              <ModalCloseButton />
            </Flex>
            <Flex flexDirection="row" mt={4}>
              <Box>
                <Heading size="md">
                  <Icon
                    as={BsCardText}
                    color="#42526e"
                    mx={2}
                    fontSize="24px"
                  />
                  Description
                </Heading>
                <form onSubmit={this.updateCard}>
                  <FormControl
                    display={
                      this.state.showAddDescriptionForm ? "block" : "none"
                    }
                    mt={2}
                  >
                    <Textarea
                      placeholder="Enter a description for this card..."
                      borderRadius={5}
                      resize="none"
                      p="6px 8px 2px"
                      id="description"
                      boxShadow="0 1px 0 rgba(9,30,66,.25)"
                      value={this.state.description}
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
                        id="descriptionInput"
                        size="sm"
                        _hover={{ bg: "#61bd4f" }}
                        variant="solid"
                        onClick={() => this.setState({
                          showAddDescriptionButton: true,
                          showAddDescriptionForm: false,
                        })}
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
                            showAddDescriptionButton: true,
                            showAddDescriptionForm: false,
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
                    this.setState({
                      showAddDescriptionForm: true,
                      showAddDescriptionButton: false,
                    });
                  }}
                  display={
                    this.state.showAddDescriptionButton ? "block" : "none"
                  }
                >
                  + Add a card
                </Button>
              </Box>
              <Box></Box>
            </Flex>
          </ModalHeader>

          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    );
  }
}

export default cardModal;
