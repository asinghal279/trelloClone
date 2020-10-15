import React, { Component } from "react";
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
  FormLabel,
} from "@chakra-ui/core";
import { BsWindow, BsCardText, BsCheckBox } from "react-icons/bs";
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
      checkItems: [],
      newChecklistItem: "",
      showAddChecklistItemForm: false,
      addChecklist: "",
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
    if (this.props.open !== prevProps.open && prevProps.open !== true) {
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
      .then(() => {
        this.props.getCards();
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
      .then(() => {
        this.setState({
          checklists: this.state.checklists.filter(
            (checklist) => checklist.id != this.state.currentDeletingChecklistId
          ),
          newChecklistItem: "",
          showAddChecklistItemForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteChecklistItem = (checklistId, itemId) => {
    Axios.delete(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems/${itemId}?key=${this.key}&token=${this.token}`
    )
      .then(() => {
        this.setState({
          newChecklistItem: "",
        });
        this.getChecklists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateChecklistItemState = (checklistId, itemId, state) => {
    Axios.put(
      `https://api.trello.com/1/cards/${this.props.cardId}/checklist/${checklistId}/checkItem/${itemId}?key=${this.key}&token=${this.token}`,
      {
        state: state,
      }
    )
      .then(() => {
        this.getChecklists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addChecklist = (e) => {
    e.preventDefault();
    Axios.post(
      `https://api.trello.com/1/checklists?key=${this.key}&token=${this.token}&idCard=${this.props.cardId}`,
      {
        name: this.state.addChecklist,
      }
    )
      .then((response) => {
        this.setState({
          checklists: [...this.state.checklists, response.data],
          newChecklistItem: "",
          addChecklist: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCard = () => {
    Axios.delete(
      `https://api.trello.com/1/cards/${this.props.cardId}?key=${this.key}&token=${this.token}`
    )
      .then(() => {
        this.props.close();
        this.setState({
          newChecklistItem: "",
        });
        this.props.getCards();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onClose = () => this.setState({ isOpen: false });
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
            <Flex flexDirection="row" justify="space-between" mt={5}>
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
                    <Box name="checklist" key={checklist.id}>
                      <Flex justify="space-between">
                        <Icon as={BsCheckBox} size="28px" />
                        <Text>{checklist.name}</Text>
                        <Popover placement="bottom-start">
                          <PopoverTrigger>
                            <Button
                              bg="rgb(9 30 66 / 4%)"
                              size="xs"
                              onClick={() =>
                                this.setState({
                                  currentDeletingChecklistId: checklist.id,
                                })
                              }
                            >
                              Delete
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent zIndex={4}>
                            <PopoverHeader
                              fontSize={16}
                              textAlign="center"
                              fontWeight={300}
                            >
                              Delete Checklist?
                            </PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody fontSize={16} fontWeight={300}>
                              Deleting a checklist is permanent and there is no
                              way to get it back.
                            </PopoverBody>
                            <PopoverFooter>
                              <Button
                                variantColor="red"
                                w="100%"
                                size="sm"
                                onClick={() =>
                                  this.deleteChecklist(checklist.id)
                                }
                              >
                                Button
                              </Button>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                      </Flex>
                      <Progress
                        value={
                          (checklist.checkItems.filter(
                            (item) => item.state === "complete"
                          ).length /
                            checklist.checkItems.length) *
                          100
                        }
                        color={
                          (checklist.checkItems.filter(
                            (item) => item.state === "complete"
                          ).length /
                            checklist.checkItems.length) *
                            100 ===
                          100
                            ? "green"
                            : "blue"
                        }
                        borderRadius={20}
                        mt={2}
                      />
                      <Stack name="checklist-item-container" mt="sm">
                        {checklist.checkItems.map((item) => (
                          <Flex justify="space-between" mt={3}>
                            <Checkbox
                              isChecked={
                                item.state === "complete" ? true : false
                              }
                              onChange={async () => {
                                await this.setState({
                                  currentIsChecked:
                                    item.state === "complete" ? false : true,
                                });
                                await this.updateChecklistItemState(
                                  item.idChecklist,
                                  item.id,
                                  this.state.currentIsChecked
                                    ? "complete"
                                    : "incomplete"
                                );
                              }}
                            >
                              <Text as={item.state === "complete" ? "del" : ""}>
                                {item.name}
                              </Text>
                            </Checkbox>
                            <IconButton
                              variantColor="#42526e"
                              variant="outline"
                              size="xs"
                              fontSize="12px"
                              border="none"
                              icon="delete"
                              onClick={() =>
                                this.deleteChecklistItem(
                                  item.idChecklist,
                                  item.id
                                )
                              }
                            />
                          </Flex>
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
              <Box w="35%">
                <Popover>
                  <PopoverTrigger>
                    <Button w="100%" mb={2} fontSize={16}>
                      + Add Checklist
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent zIndex={10}>
                    <PopoverArrow />
                    <PopoverHeader textAlign="center" fontSize={16}>
                      Add Checklist
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <form onSubmit={this.addChecklist}>
                        <FormControl>
                          <FormLabel fontSize={16}>Title</FormLabel>
                          <Input
                            id="addChecklist"
                            value={this.state.addChecklist}
                            onChange={this.handleInputChange}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          bg="#5aac44"
                          type="submit"
                          color="white"
                          mt={3}
                          fontWeight="300"
                          id="checklistItemInput"
                          size="sm"
                          _hover={{ bg: "#61bd4f" }}
                          variant="solid"
                          fontSize={16}
                        >
                          Add
                        </Button>
                      </form>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Popover placement="bottom-start" trigger="hover">
                  <PopoverTrigger>
                    <Button w="100%" fontSize={16}>
                      Delete Card
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent zIndex={4}>
                    <PopoverHeader
                      fontSize={16}
                      textAlign="center"
                      fontWeight={300}
                      color="#0567a2"
                    >
                      Delete Card?
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverFooter>
                      <Button
                        variantColor="red"
                        w="100%"
                        size="sm"
                        onClick={this.deleteCard}
                      >
                        Delete
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Box>
            </Flex>
          </ModalHeader>

          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    );
  }
}

export default cardModal;
