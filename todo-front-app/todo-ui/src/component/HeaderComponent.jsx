//Import the 'react' library as 'react
import React from 'react';

//Import the 'NavLink' component from React Router.
import { NavLink } from 'react-router-dom';

//Import the functions from 'AuthService' to check whether the user is logged in or not.
import { isUserLoggedIn, logout } from '../services/AuthService';

//Import the 'useNavigate' hook from React Router
import { useNavigate } from 'react-router-dom';

//Create a functional component named 'HeaderComponent'.
const HeaderComponent = () => {

//Check whether the user is logged in.
const isAuth = isUserLoggedIn();

//Define the navigation function using the 'useNavigate' hook from React Router.
const navigator = useNavigate();

//Function to allow the user to log out
function handleLogout() {
    logout();
    //Redirect to the "/login" page after logging out.
    navigator('/login');
  }

//JSX is used in the component's return value.
return (
    <div>
      {/* A <header> element containing header elements. */}
      <header>
        {/*A navbar with styles provided by Bootstrap. */}
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div>
            {/* A navbar brand link containing the title of the page */}
            <a href='http://localhost:3000' className='navbar-brand'>
              Todo Management Application
            </a>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              {/* If the user is logged in, display the 'Todos' link*/}
              {isAuth && (
                <li className='nav-item'>
                  <NavLink to="/todos" className="nav-link">Todos</NavLink>
                </li>
              )}
            </ul>
          </div>
          <ul className='navbar-nav'>
            {/*If the user is not logged in, display the 'Register' link.*/}
            {!isAuth && (
              <li className='nav-item'>
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
            )}
            {/* If the user is not logged in, display the 'Login' link.*/}
            {!isAuth && (
              <li className='nav-item'>
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
            )}
            {/* If the user is logged in, display the 'Logout' link and perform the logout operation.*/}
            {isAuth && (
              <li className='nav-item'>
                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

//Export the HeaderComponent component so that it can be used in other files.
export default HeaderComponent;
