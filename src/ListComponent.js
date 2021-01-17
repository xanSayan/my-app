import React, { Component } from 'react';
import { Table, Divider, Button } from 'antd';
import PropTypes from 'prop-types';
import Column from 'antd/lib/table/Column';
import { connect } from 'react-redux';
import { deleteUser, deleteTodo } from './reducer';

class ListComponent extends Component {
  deleteRecord(type, record) {
    const { dispatch } = this.props;
    if (type === 'users') {
      dispatch(deleteUser(record));
    } else {
      dispatch(deleteTodo(record));
    }
  }

  render() {
    const { data, type } = this.props;
    return (
      <div>
        <Table dataSource={data} pagination={{ pageSize: 4 }}>
          <Column
            title={type === 'users' ? 'Name' : 'Todo Action'}
            dataIndex={type === 'users' ? 'name' : 'todoAction'}
            key={type === 'users' ? 'name' : 'todoAction'}
          />
          <Column
            title={type === 'users' ? 'Email' : 'Date Added'}
            dataIndex={type === 'users' ? 'email' : 'dateAdded'}
            key={type === 'users' ? 'email' : 'dateAdded'}
          />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Button type="primary">Edit</Button>
                <Divider type="vertical" />
                <Button
                  type="primary"
                  onClick={() => this.deleteRecord(type, record)}
                >
                  Delete
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

ListComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.oneOf(['users', 'todos']),
};

ListComponent.defaultProps = {
  data: [],
  type: 'users',
};

export default connect()(ListComponent);
