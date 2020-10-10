import React, { Component } from "react";
import "./card.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
  Stack,
  Text,
  Progress,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
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
      description: "",
      checklists: [],
      newChecklistItem: "",
      showAddChecklistItemForm: false,
    };
    this.key = `9cb0af8bad58725f09508dd5aace64a5`;
    this.token = `30b80c5d0950b7ee2663d550683fab28f2d67e1a6ccace739a7ba1e74113bdd9`;
  }

  getCard = () => {
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

  getChecklists = () => {
    Axios.get(
      `https://api.trello.com/1/cards/${this.props.cardId}/checklists?key=${this.key}&token=${this.token}`
    )
      .then((res) => {
        const checklists = res.data;
        this.setState({
          checklists,
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
      this.getChecklists();
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

  addChecklistItem = (e) => {
    e.preventDefault();
    Axios.post(
      `https://api.trello.com/1/checklists/${this.state.currentChecklistId}/checkItems?key=${this.key}&token=${this.token}&name=${this.state.newChecklistItem}`
    )
      .then((response) => {
        console.log(response);
        this.getChecklists();
        this.setState({
          newChecklistItem: "",
          showAddChecklistItemForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  deleteChecklist = (checklistId) => {
    Axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}?key=${this.key}&token=${this.token}`
    )
      .then((response) => {
        console.log(response);
        this.getChecklists();
        this.setState({
          newChecklistItem: "",
          showAddChecklistItemForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <Flex flexDirection="row" mt={5}>
              <Box w="60%">
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
                        onClick={() =>
                          this.setState({
                            showAddDescriptionForm: false,
                          })
                        }
                      >
                        Add Description
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
                            showAddDescriptionForm: false,
                          });
                        }}
                      />
                    </ButtonGroup>
                  </FormControl>
                </form>
                <Button
                  size="md"
                  w="100%"
                  mt={2}
                  border="none"
                  fontWeight="600"
                  color="#747f94"
                  textAlign="left"
                  onClick={() => {
                    this.setState({
                      showAddDescriptionForm: true,
                    });
                  }}
                  display={this.state.showAddDescriptionForm ? "none" : "block"}
                >
                  {this.state.description === ""
                    ? "+ Add Description"
                    : this.state.description}
                </Button>
                <Stack id="checklistContainer" mt={5} spacing={4}>
                  {this.state.checklists.map((checklist) => (
                    <Box name="checklist">
                      <Flex justify="space-between">
                        <Icon name="check" size="24px" />
                        <Text>{checklist.name}</Text>
                        <Popover placement="bottom-start">
                          <PopoverTrigger>
                            <Button bg="rgb(9 30 66 / 4%)" size="xs">
                              Delete
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent zIndex={4}>
                            <PopoverHeader fontSize={16} textAlign="center" fontWeight={300}>Delete Checklist?</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody fontSize={16} fontWeight={300}>
                              Deleting a checklist is permanent and there is no
                              way to get it back.
                            </PopoverBody>
                            <PopoverFooter>
                              <Button variantColor="red" w="100%" size="sm" onClick={() => this.deleteChecklist(checklist.id)}>Button</Button>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                      </Flex>
                      <Progress value={80} borderRadius={20} mt={2} />
                      <Stack name="checklist-item-container" mt="sm">
                        {checklist.checkItems.map((item) => (
                          <Checkbox mt={3}>{item.name}</Checkbox>
                        ))}
                        <form onSubmit={this.addChecklistItem}>
                          <FormControl
                            id={checklist.id}
                            display={
                              this.state.currentChecklistId == checklist.id
                                ? "block"
                                : "none"
                            }
                            mt={2}
                          >
                            <Input
                              placeholder="Enter a item for this card..."
                              borderRadius={5}
                              resize="none"
                              p="6px 8px 2px"
                              id="newChecklistItem"
                              boxShadow="0 1px 0 rgba(9,30,66,.25)"
                              value={this.state.newChecklistItem}
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
                                id="checklistItemInput"
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
                                    showAddChecklistItemForm: false,
                                    currentChecklistId: null,
                                  });
                                }}
                              />
                            </ButtonGroup>
                          </FormControl>
                        </form>
                        <Button
                          bg="rgb(9 30 66 / 4%)"
                          size="sm"
                          mt={2}
                          id={checklist.name}
                          onClick={() => {
                            this.setState({
                              showAddChecklistItemForm: true,
                              currentChecklistId: checklist.id,
                              newChecklistItem: "",
                            });
                          }}
                          display={
                            this.state.currentChecklistId != checklist.id
                              ? "block"
                              : "none"
                          }
                        >
                          Add Items
                        </Button>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
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
