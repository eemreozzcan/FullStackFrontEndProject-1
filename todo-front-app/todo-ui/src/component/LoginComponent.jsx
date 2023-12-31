import React, { useState } from 'react'; // Import useState hook
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService'; // Import loginAPICall function from AuthService
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router

const LoginComponent = () => {
    //Define username and password states.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Define the navigation function using the useNavigate hook from React Router.
    const navigator = useNavigate();

    //The function that will run when the login form is submitted
    async function handleLoginForm(e) {
        //Prevent the default behavior of the form
        e.preventDefault();

        try {
            //Make the API call and receive the response
            const response = await loginAPICall(username, password);
            console.log(response.data);

            //Store user information
            const token = 'Bearer ' + response.data.accessToken;
            const role = response.data.role;
            storeToken(token);
            saveLoggedInUser(username, role);

            //Redirect to the home page
            navigator("/todos");

            //Reload the page
            window.location.reload(false);
        } catch (error) {
            //Print to the console in case of an error
            console.error(error);
        }
    }

    //JSX return - includes the login form
    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'> Login Form </h2>
                        </div>

                        <div className='card-body'>
                            <form>
                                {/* Username input field */}
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> Username or Email</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/*Password entry field*/}
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> Password </label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Form submit button*/}
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//Export the LoginComponent
export default LoginComponent;
