// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add Grocery </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="item"
                value={this.state.activeItem.item}
                onChange={this.handleChange}
                placeholder="Enter Item"
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                value={this.state.activeItem.quantity}
                onChange={this.handleChange}
                placeholder="Enter Category"
              />
            </FormGroup>
             {/* if id exists show checkbox for 'purchased' else (new item) don't show */}
            {this.state.activeItem.id ? (<FormGroup check>
              <Label for="purchased">
                <Input
                  type="checkbox"
                  name="purchased"
                  checked={this.state.activeItem.purchased}
                  onChange={this.handleChange}
                />
                Purchased
              </Label>
            </FormGroup>) : null}
            
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}