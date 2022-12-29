import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import S3FileUpload from 'react-s3';
import { createTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { onDeleteTodo } from './graphql/subscriptions';
window.Buffer=window.Buffer||require('buffer').Buffer;

const initialState = { name: '', description: '' };
const S3_BUCKET =process.env.REACT_APP_S3_BUCKET;
const REGION =process.env.REACT_APP_REGION;
const ACCESS_KEY =process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY =process.env.REACT_APP_SECRET_ACCESS_KEY;



const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
  
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

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
}

const handleUpload = async (file) => {
  console.log(config)
  S3FileUpload.uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
}

  return (
    <>
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
    <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div></>
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
