//Imports the Axios library. Axios is a library that allows us to make HTTP requests.
import axios from "axios";

//Imports the getToken function from the AuthService file. This function allows us to retrieve the authorization token.
import { getToken } from "./AuthService";

//Defines the base URL of the Todo API.
const BASE_REST_API_URL = 'http://localhost:8080/api/todos';

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
//An interceptor is added that allows requests to be intercepted before they are sent.
axios.interceptors.request.use(function (config) {
    //Adds the authorization token as a header to each request.
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
  //If an error occurs during the request, it rejects the error.
    return Promise.reject(error);
  });
//Defines a function that fetches all todos.
export const getAllTodos = () => axios.get(BASE_REST_API_URL)

//Defines a function that registers a new todo.
export const saveTodo = (todo) => axios.post(BASE_REST_API_URL, todo)

//Defines a function that retrieves todo with a specific ID.
export const getTodo = (id) => axios.get(BASE_REST_API_URL + '/' + id)

//Defines a function that updates todo with a specific ID.
export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

//Defines a function that deletes todo with a specific ID.
export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

//Defines a function that marks a todo with a given ID as completed.
export const completeTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

//Defines a function that marks a todo with a given ID as incomplete.
export const inCompleteTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')