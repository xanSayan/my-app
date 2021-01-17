import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Button, Modal, Spin } from 'antd';

import ListComponent from './ListComponent';
import { displayModal } from './reducer';
import WrappedCreate from './Create';

const { TabPane } = Tabs;

function App() {
  const users = useSelector((state) => state.users);
  const todos = useSelector((state) => state.todos);
  const showModal = useSelector((state) => state.displayModal);
  const isLoading = useSelector((state) => state.isLoading);
  const showType = useSelector((state) => state.showType);
  const dispatch = useDispatch();

  return (
    <div className="base">
      <Modal
        title="Create Modal"
        visible={showModal}
        onCancel={() => dispatch(displayModal(false))}
      >
        {isLoading && <Spin size="large">Loading...</Spin>}
        {!isLoading && showType === 'users' && <WrappedCreate type="users" />}
        {!isLoading && showType === 'todos' && <WrappedCreate type="todos" />}
      </Modal>
      <div className="tab-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Users" key="1">
            <div style={{ width: '100%', padding: '10px' }}>
              <Button
                type="primary"
                onClick={() => dispatch(displayModal(true, 'users'))}
              >
                Create
              </Button>
            </div>
            <ListComponent data={users} type="users" />
          </TabPane>
          <TabPane tab="To-dos" key="2">
            <div style={{ width: '100%', padding: '10px' }}>
              <Button
                type="primary"
                onClick={() => dispatch(displayModal(true, 'todos'))}
              >
                Create
              </Button>
            </div>
            <ListComponent data={todos} type="todos" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
