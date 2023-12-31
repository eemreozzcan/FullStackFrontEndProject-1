//Imports the Axios library. Axios is a JavaScript library used for making HTTP requests.
import axios from 'axios'

//"Specifies the base URL for the RESTful API for departments. This defines the base address for requests made to the API."
const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/departments'

//"Exports a function that retrieves all departments. It sends a request to the API using Axios's GET method."
export const getAllDepartments = () => axios.get(DEPARTMENT_REST_API_BASE_URL);

//"Exports a function that creates a new department. It sends a request to the API using Axios's POST method and sends an object containing the data for the new department."
export const createDepartment = (department) => axios.post(DEPARTMENT_REST_API_BASE_URL, department);

//"Exports a function that retrieves information about a specific department. It sends a request to the API using Axios's GET method."
export const getDepartmentById = (departmentId) => axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);

//Exports a function that updates a specific department. Sends an update request to the API using Axios's PUT method.
export const updateDepartment = (departmentId, department) => axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId, department);

//"Exports a function that deletes a specific department. It sends a request to the API using Axios's DELETE method."
export const deleteDepartment = (departmentId) => axios.delete(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);