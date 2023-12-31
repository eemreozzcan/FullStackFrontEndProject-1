//Imports the Axios library. Axios is a JavaScript library used for making HTTP requests.
import axios from "axios";

//"Specifies the base URL for the RESTful API for employees. This defines the base address for requests made to the API."
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

//"Exports a function that retrieves all employees. It sends a request to the API using Axios's GET method."
export const listEmployees = () => axios.get(REST_API_BASE_URL);

//"Exports a function that creates a new employee. It sends a request to the API using Axios's POST method and sends an object containing the data for the new employee."
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

//"Exports a function that retrieves information about a specific employee. It sends a request to the API using Axios's GET method."
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

//Exports a function that updates a specific employee. Sends an update request to the API using Axios's PUT method.
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

//"Exports a function that deletes a specific employee. It sends a request to the API using Axios's DELETE method."
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);