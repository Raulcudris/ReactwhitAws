import { Heading, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import './App.css';
import { createTask } from './graphql/mutations';
import { listTasks } from './graphql/queries';

function App({signOut, user}) {
  
  const [task , setTask] = useState({
    name: "",
    description:""
  })

  const [tasks , setTasks] = useState([]);

  const handleSubmit  = async (e)=>{
      e.preventDefault();
      //console.log(task);
      const result = await API.graphql(graphqlOperation(createTask, {input: task}))
      console.log(result);
  }

  useEffect(()=>{
    async function loadTasks() {
      const result = await API.graphql(graphqlOperation(listTasks))
      console.log(result)
      setTasks(result.data.listTasks.items);
    }
    loadTasks()
  },[])


  return (
    <>
    <Heading level={1}>Hello {user.username}</Heading>
      <form onSubmit={handleSubmit} >
      <input  name='name' 
              placeholder='Title'
              onChange={e => setTask({
                ...task, name: e.target.value
              })}
              />
      <textarea name='description'
                placeholder='description'
                onChange={e => setTask({
                  ...task, description: e.target.value
                })}
                /> 
      <button >Submit</button>
    </form>
    { JSON.stringify(tasks)}
    <button onClick={signOut} >sign out</button>

    </>  
    );
}

export default withAuthenticator(App);
