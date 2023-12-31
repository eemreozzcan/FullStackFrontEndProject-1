import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {

    //States named firstName, lastName, email, departmentId, and departments are defined
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])


    //It defines a useEffect hook that retrieves all departments when the component is loaded.
    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    //To retrieve URL parameters from React Router, the useParams hook is used
    const {id} = useParams();

    //It defines an 'errors' state to track form errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    //The useNavigate hook is used for page navigation
    const navigator = useNavigate();

    //It fetches all departments and sets them to the state when the component is loaded.
    useEffect(() => {

        //It defines a useEffect hook that will run when the component is loaded or when the 'id' parameter changes
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    //A function that performs the operation of adding or updating an employee
    function saveOrUpdateEmployee(e){

        //It prevents the default behavior of the form
        e.preventDefault();

        //The validateForm function is called to validate the form
        if(validateForm()){

            //The employee object is logged to the console
            const employee = {firstName, lastName, email, departmentId}
            console.log(employee)

            //The updateEmployee function is called if the id parameter is defined. Otherwise, the createEmployee function is called.
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } 
            //The createEmployee function is called if the id parameter is not defined
            else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }
    //A function that validates the form, checks for errors, and sets them to the state.
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        //If the value of 'firstName' is not empty, it makes 'errorsCopy.firstName' an empty string. Otherwise, 
        //it sets the error message to 'First name is required' and sets the 'valid' variable to false.
        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        //If the value of 'lastName' is not empty, it makes 'errorsCopy.lastName' an empty string. Otherwise,
        //it sets the error message to 'Last name is required' and sets the 'valid' variable to false.
        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        //If the value of 'email' is not empty, it makes 'errorsCopy.email' an empty string. Otherwise,
        //it sets the error message to 'Email is required' and sets the 'valid' variable to false.
        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        //If the value of 'departmentId' is not empty, it makes 'errorsCopy.department' an empty string. Otherwise,
        //it sets the error message to 'Select Department' and sets the 'valid' variable to false.
        if(departmentId){
            errorsCopy.department = ''
        }else {
            errorsCopy.department = 'Select Department'
            valid = false
        }

        setErrors(errorsCopy);
        
        return valid;

    }
    //A function that sets the page title.
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    //The return statement defines the HTML to be displayed on the page
  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
               {
                    pageTitle()
               }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select
                               className={`form-control ${ errors.department ? 'is-invalid': '' }`}
                               value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                               <option value="Select Department">Select Department</option>
                                {
                                    departments.map( department => 
                                        <option key={department.id} value={department.id} > {department.departmentName}</option>
                                        )
                                }
                            </select>
                            { errors.department && <div className='invalid-feedback'> { errors.department} </div> }
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent