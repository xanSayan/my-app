import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { createUser, isLoading, createTodo } from "./reducer";
//var dateFormat = require("dateformat");

//let timer = null;

class Create extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      this.props.dispatch(isLoading(true));
      await this.delay(2000);
      if (this.props.type === "users") {
        this.props.dispatch(createUser(values));
      } else {
        let todo = {
          todoAction: values.action,
          dateAdded: values.date
        };
        this.props.dispatch(createTodo(todo));
      }
      this.props.dispatch(isLoading(false));
    });
  };

  async delay(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
    return;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { type } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {this.props.type === "users" && (
            <div>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input your name!" }
                  ]
                })(<Input placeholder="Name" />)}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ]
                })(<Input placeholder="Email" />)}
              </Form.Item>
            </div>
          )}
          {this.props.type === "todos" && (
            <div>
              <Form.Item label="Action">
                {getFieldDecorator("action", {
                  rules: [
                    { required: true, message: "Please input your action!" }
                  ]
                })(<Input placeholder="Action" />)}
              </Form.Item>
              <Form.Item label="Date">
                {getFieldDecorator("date", {
                  rules: [
                    { required: true, message: "Please input your date!" }
                  ]
                })(<Input placeholder="Date" />)}
              </Form.Item>
            </div>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Create.propTypes = {
  type: PropTypes.oneOf(["users", "todos"])
};

const WrappedCreate = Form.create({ name: "create" })(Create);

export default connect()(WrappedCreate);
