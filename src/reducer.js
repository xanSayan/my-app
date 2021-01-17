import Data from './Data';

export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';

export const DELETE_TODO = 'DELETE_TODO';
export const CREATE_TODO = 'CREATE_TODO';

export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const LOADING = 'LOADING';

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});

export const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: todo,
});

export const deleteTodo = (todo) => ({
  type: DELETE_TODO,
  payload: todo,
});

export const displayModal = (boolean, type) => ({
  type: DISPLAY_MODAL,
  payload: { boolean, type },
});

export const isLoading = (boolean) => ({
  type: LOADING,
  payload: boolean,
});

const initialState = {
  users: Data.Users,
  todos: Data.ToDos,
  displayModal: false,
  isLoading: false,
  showType: 'users',
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER: {
      return { ...state, users: [...state.users, payload] };
    }
    case DELETE_USER: {
      const newUsers = state.users.filter(
        (object) =>
          object.name !== payload.name && object.email !== payload.email
      );
      return { ...state, users: newUsers };
    }
    case CREATE_TODO: {
      return { ...state, todos: [...state.todos, payload] };
    }
    case DELETE_TODO: {
      const newTodos = state.todos.filter(
        (object) =>
          object.todoAction !== payload.todoAction &&
          object.dateAdded !== payload.dateAdded
      );
      return { ...state, todos: newTodos };
    }
    case DISPLAY_MODAL: {
      return {
        ...state,
        displayModal: payload.boolean,
        showType: payload.type,
      };
    }
    case LOADING: {
      return { ...state, isLoading: payload };
    }
    default:
      return state;
  }
};
