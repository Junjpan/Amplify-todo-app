import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { onDeleteTodo } from './graphql/subscriptions';

const initialState = { name: '', description: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(API);
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  const deleteContent = async (todoId) => {
    console.log(todoId);
    try {
      await API.graphql(
        graphqlOperation(deleteTodo, { input: { id: todoId } })
      );
    } catch (err) {
      console.log('delete todo', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder='Name'
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder='Description'
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div
          key={todo.id ? todo.id : index}
          style={styles.todo}
          onClick={() => {
            deleteContent(todo.id);
          }}
        >
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

export default App;