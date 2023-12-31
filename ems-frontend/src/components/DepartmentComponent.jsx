import React, { useEffect, useState } from 'react' //Adds React and useState functions to the React application
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService'; //Adds createDepartment, getDepartmentById, and updateDepartment functions to the React application
import { useNavigate, useParams } from 'react-router-dom'; //Adds useNavigate and useParams functions to the React application

const DepartmentComponent = () => { //Creates a functional React component named DepartmentComponent.

  //States named departmentName and departmentDescription are defined
  const [departmentName, setDepartmentName] = useState('')
  const [departmentDescription, setDepartmentDescription] = useState('')

  //The useParams hook is used to retrieve URL parameters from React Router
  const {id} = useParams();

  //The useNavigate hook is used for page navigation.
  const navigator = useNavigate();

  //A useEffect hook is defined to run when the page is loaded or when the id parameter changes
  useEffect(() => {

    //The getDepartmentById function is used to retrieve information about a specific department
    getDepartmentById(id).then((response) => {
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    }).catch(error => {
      console.error(error);
    })

  }, [id])

  //The function defining the process of adding or updating a department is defined.
  function saveOrUpdateDepartment(e){
    e.preventDefault();

    //The validateForm function is called to validate the form
    const department = { departmentName, departmentDescription }

    //The department object is logged to the console
    console.log(department); 

    //The updateDepartment function is called if the id parameter is defined. Otherwise, the createDepartment function is called.
    if(id){
      updateDepartment(id, department).then((response) => {
        console.log(response.data);
        navigator('/departments');
      }).catch(error => {
        console.error(error);
      })
    }else {
      createDepartment(department).then((response) => {
        console.log(response.data);
        navigator('/departments')
      }).catch(error => {
        console.error(error);
      })
    }

  }

  //The validateForm function is defined to validate the form
  function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Department</h2>
    } else {
        return <h2 className='text-center'>Add Department</h2>
    }
  }
  //The return statement defines the HTML to be displayed on the page
  return (
    <div className='container'><br /><br />
      <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                pageTitle()
              }

              <div className='card-body'>
                  <form>
                      <div className='form-group mb-2'>
                          <label className='form-label'>Department Name:</label>
                          <input
                            type='text'
                            name='departmentName'
                            placeholder='Enter Department Name'
                            className='form-control'
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}

                          >
                          </input>
                      </div>

                      <div className='form-group mb-2'>
                          <label className='form-label'>Department Description:</label>
                          <input
                            type='text'
                            name='departmentDescription'
                            placeholder='Enter Department Description'
                            value={departmentDescription}
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            className='form-control'
                          >
                          </input>
                      </div>
                      <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                  </form>

              </div>
          </div>

      </div>

    </div>
  )
}

export default DepartmentComponent