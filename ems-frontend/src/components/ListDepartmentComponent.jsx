//Import the 'react' library as 'react
import React, { useEffect, useState } from 'react';

//Import the department service functions
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';

//Import 'Link' and 'useNavigate' functions from React Router
import { Link, useNavigate } from 'react-router-dom';

//Create a functional component named 'ListDepartmentComponent
const ListDepartmentComponent = () => {
//Define a state using the State hook to store departments
const [departments, setDepartments] = useState([]);

//Define the navigation function using the 'useNavigate' hook from React Router.
const navigator = useNavigate();

//The 'useEffect' hook that will be called when the component is first rendered.
  useEffect(() => {
    // Departmanları listeleyen fonksiyonu çağır
    listOfDepartments();
  }, []);

//Function that fetches departments and updates the state
  function listOfDepartments() {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

//Function to update a department
  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

 //Function to delete a department
  function removeDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        //Call the function that updates departments
        listOfDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

 //The component's return value uses JSX
  return (
    <div className='container'>
      <h2 className='text-center'>List of Departments</h2>
      {/* Link to add a new department*/}
      <Link to='/add-department' className='btn btn-primary mb-2'>
        Add Department
      </Link>
      {/* Table listing the departments.*/}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows mapping the departments and containing buttons for each. */}
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                {/* Update button for the department.*/}
                <button
                  onClick={() => updateDepartment(department.id)}
                  className='btn btn-info'
                >
                  Update
                </button>
                {/*Delete button for the department*/}
                <button
                  onClick={() => removeDepartment(department.id)}
                  className='btn btn-danger'
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

//Export the ListDepartmentComponent component so that it can be used in other files.
export default ListDepartmentComponent;
