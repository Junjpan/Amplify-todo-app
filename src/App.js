import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import S3FileUpload from 'react-s3';
// import { createTodo, deleteTodo } from './graphql/mutations';
// import { listTodos } from './graphql/queries';
// import { onDeleteTodo } from './graphql/subscriptions';
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



  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  // async function fetchTodos() {
  //   try {
  //     const todoData = await API.graphql(graphqlOperation(listTodos));
  //     console.log(todoData);
  //     const todos = todoData.data.listTodos.items;
  //     setTodos(todos);
  //   } catch (err) {
  //     console.log('error fetching todos');
  //   }
  // }

  // async function addTodo() {
  //   try {
  //     if (!formState.name || !formState.description) return;
  //     const todo = { ...formState };
  //     setTodos([...todos, todo]);
  //     setFormState(initialState);
  //     await API.graphql(graphqlOperation(createTodo, { input: todo }));
  //   } catch (err) {
  //     console.log('error creating todo:', err);
  //   }
  // }

  // const deleteContent = async (todoId) => {
  //   console.log(todoId);
  //   try {
  //     await API.graphql(
  //       graphqlOperation(deleteTodo, { input: { id: todoId } })
  //     );
  //   } catch (err) {
  //     console.log('delete todo', err);
  //   }
  // };

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
    
    <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div></>
  );
};

export default App