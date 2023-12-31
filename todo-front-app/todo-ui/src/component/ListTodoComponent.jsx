//Import the React library as 'react'.
import React, { useEffect, useState } from 'react';

//Import the relevant functions from TodoService.
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService';

//Import the `useNavigate` hook from React Router.
import { useNavigate } from 'react-router-dom';

//Import the `isAdminUser` function from AuthService.
import { isAdminUser } from '../services/AuthService';

//Create a functional component named ListTodoComponent.
const ListTodoComponent = () => {
  //Define a state named 'todos' using the state hook.
  const [todos, setTodos] = useState([]);

  //Define the navigation function using the `useNavigate` hook.
  const navigate = useNavigate();

  //Define a state named 'isAdmin' and initialize this state using the `isAdminUser` function.
  const isAdmin = isAdminUser();

  //The useEffect hook that will be called when the component is first rendered.
  useEffect(() => {
    //Call the function that lists the todos.
    listTodos();
  }, []);

  //Define the function that lists the todos.
  function listTodos() {
    //Call the function from TodoService that retrieves all todos.
    getAllTodos()
      .then((response) => {
        //Update the 'todos' state using the data from the response.
        setTodos(response.data);
      })
      .catch((error) => {
        //Print the error message to the console in case of an error.
        console.error(error);
      });
  }

  //A function that redirects to add a new todo.
  function addNewTodo() {
    // Redirect to the '/add-todo' page.
    navigate('/add-todo');
  }

  // A function that redirects to update a todo.
  function updateTodo(id) {
    console.log(id);
    //Redirect to the '/update-todo/${id}' page.
    navigate(`/update-todo/${id}`);
  }

  //A function to delete a todo.
  function removeTodo(id) {
    //Call the function from TodoService to delete the todo.
    deleteTodo(id)
      .then((response) => {
        //Call the function to update the todos.
        listTodos();
      })
      .catch((error) => {
        //Print the error message to the console in case of an error.
        console.error(error);
      });
  }

  //A function to mark the todo as completed.
  function markCompleteTodo(id) {
    //Call the function from TodoService to mark the todo as completed.
    completeTodo(id)
      .then((response) => {
        //Call the function to update the todos.
        listTodos();
      })
      .catch((error) => {
        //Print the error message to the console in case of an error.
        console.error(error);
      });
  }

  //A function to mark the todo as incomplete.
  function markInCompleteTodo(id) {
   //Call the function from TodoService to mark the todo as incomplete.
    inCompleteTodo(id)
      .then((response) => {
        //Call the function to update the todos.
        listTodos();
      })
      .catch((error) => {
        //Print the error message to the console in case of an error.
        console.error(error);
      });
  }
  //The component's return value uses JSX.
  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        {
            isAdmin && 
            <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        }
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES': 'NO'}</td>
                                <td>
                                    {
                                        isAdmin && 
                                        <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                    }
                                    {
                                        isAdmin &&
                                        <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={ { marginLeft: "10px" }} >Delete</button>
                                    }
                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={ { marginLeft: "10px" }} >Complete</button>
                                    <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={ { marginLeft: "10px" }} >In Complete</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>

    </div>
  )
}
//Export the ListTodoComponent.
export default ListTodoComponent