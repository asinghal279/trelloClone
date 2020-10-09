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
} from "@chakra-ui/core";
import { BsWindow } from "react-icons/bs";
import Axios from "axios";

class cardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
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
        //   const name = res.data;
        //   this.setState({ name });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleOpenModal = (bool) => {
    if (bool) {
      this.getCard();
      return true;
    }
    return false;
  };

  render() {
    return (
      <Modal
        isOpen={this.handleOpenModal(this.props.open)}
        onClose={this.props.close}
        size="xl"
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
                  children={<Icon as={BsWindow} color="#42526e" mt={2} />}
                />
                <Input
                  placeholder="Enter amount"
                  border="none"
                  //   value={this.state.selectedCardName}
                />
              </InputGroup>
              <ModalCloseButton />
            </Flex>
          </ModalHeader>

          <ModalBody></ModalBody>
          <ModalFooter>
            <Button onClick={this.props.close}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export default cardModal;
