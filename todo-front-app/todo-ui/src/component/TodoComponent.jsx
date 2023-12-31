import React, { useEffect } from 'react' //Import the 'useEffect' hook from React.
import { useState } from 'react' //Import the 'useState' hook from React.
import { getTodo, saveTodo, updateTodo } from '../services/TodoService' //Import the functions from the 'TodoService'.
import { useNavigate, useParams } from 'react-router-dom' //Import the 'useNavigate' and 'useParams' hooks from React Router.

//Create a functional component named 'TodoComponent'.
const TodoComponent = () => {

    //Define a state named 'title' using the 'useState' hook.
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    //Define the function that adds or updates a todo.
    function saveOrUpdateTodo(e){
        //Prevent the default behavior of the form.
        e.preventDefault()
        //Call the function that validates the form.
        const todo = {title, description, completed}
        console.log(todo);

        //Call the function from TodoService that adds or updates a todo.
        if(id){

            updateTodo(id, todo).then((response) => {
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        }else{
            saveTodo(todo).then((response) => {
                console.log(response.data)
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        }
    }
    //Define the function that validates the form.
    function pageTitle(){
        if(id) {
            return <h2 className='text-center'>Update Todo</h2>
        }else {
            return <h2 className='text-center'>Add Todo</h2>
        }
    }
    //The useEffect hook that will be called when the component is first rendered.
    useEffect( () => {
        
        //Call the function that lists the todos.
        if(id){
            getTodo(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    //The component's return value uses JSX.
  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Todo Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Description:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Todo Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Completed:</label>
                            <select
                                className='form-control'
                                value={completed}
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>

                            </select>
                        </div>

                        <button className='btn btn-success' onClick={ (e) => saveOrUpdateTodo(e)}>Submit</button>
                    </form>

                </div>
            </div>

        </div>
    </div>
  )
}
//Export the 'TodoComponent' component.
export default TodoComponent