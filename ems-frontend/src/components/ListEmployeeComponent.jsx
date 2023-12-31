//Import the 'react' library as 'react
import React, { useEffect, useState } from 'react';

//Import the functions from the 'EmployeeService'.
import { deleteEmployee, listEmployees } from '../services/EmployeeService';

//Import the 'useNavigate' hook from React Router.
import { useNavigate } from 'react-router-dom';

//Create a functional component named 'ListEmployeeComponent
const ListEmployeeComponent = () => {
 
//Define a state using the State hook to store employees.
const [employees, setEmployees] = useState([]);

//Define the navigation function using the 'useNavigate' hook from React Router.
  const navigator = useNavigate();

//The 'useEffect' hook that will be called when the component is first rendered.
  useEffect(() => {
    //Call the function that lists employees.
    getAllEmployees();
  }, []);

  //Function that fetches employees and updates the state.
  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Function that navigates to add a new employee.
  function addNewEmployee() {
    navigator('/add-employee');
  }

  //Function that navigates to update an employee.
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  //Function to delete employee
  function removeEmployee(id) {
    console.log(id);

    deleteEmployee(id)
      .then((response) => {
        //Call the function that updates employees.
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

 //The component's return value uses JSX
  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      {/*"Button to add a new employee"*/}
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>
        Add Employee
      </button>
      {/*"Table listing the employees."*/}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*"Table rows mapping the employees and containing buttons for each."*/}
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                {/*Update button for the employee.*/}
                <button
                  className='btn btn-info'
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                {/*"Delete button for the employee."*/}
                <button
                  className='btn btn-danger'
                  onClick={() => removeEmployee(employee.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//Export the ListEmployeeComponent component so that it can be used in other files.
export default ListEmployeeComponent;
