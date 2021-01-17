import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { createUser, isLoading, createTodo } from './reducer';

const delay = async (duration = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, duration));
  return undefined;
};

class Create extends Component {
  handleSubmit = (e) => {
    const {
      form: { validateFields },
      dispatch,
      type,
    } = this.props;
    e.preventDefault();

    validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      dispatch(isLoading(true));
      await delay(2000);
      if (type === 'users') {
        dispatch(createUser(values));
      } else {
        const todo = {
          todoAction: values.action,
          dateAdded: values.date,
        };
        dispatch(createTodo(todo));
      }
      dispatch(isLoading(false));
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      type,
    } = this.props;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {type === 'users' && (
            <div>
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                })(<Input placeholder="Name" />)}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                })(<Input placeholder="Email" />)}
              </Form.Item>
            </div>
          )}
          {type === 'todos' && (
            <div>
              <Form.Item label="Action">
                {getFieldDecorator('action', {
                  rules: [
                    { required: true, message: 'Please input your action!' },
                  ],
                })(<Input placeholder="Action" />)}
              </Form.Item>
              <Form.Item label="Date">
                {getFieldDecorator('date', {
                  rules: [
                    { required: true, message: 'Please input your date!' },
                  ],
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
  type: PropTypes.oneOf(['users', 'todos']),
};

Create.defaultProps = {
  type: 'users',
};

const WrappedCreate = Form.create({ name: 'create' })(Create);

export default connect()(WrappedCreate);
