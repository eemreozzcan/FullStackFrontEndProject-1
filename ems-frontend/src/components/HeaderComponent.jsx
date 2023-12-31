//Import the 'react' library as 'react
import React from 'react';

//Import the 'NavLink' component from the React Router library
import { NavLink } from 'react-router-dom';

//Create a functional component named 'HeaderComponent
const HeaderComponent = () => {
  //The component's return value utilizes JSX
  return (
    //Wrapping the component in a non-semantic <div> element
    <div>
      {/* An <header> element containing header elements */}
      <header>
        {/* A navbar with style properties provided by Bootstrap */}
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          {/* A navbar brand link containing the page title */}
          <a className="navbar-brand" href="https://wwww.google.com">Employee Management System</a>

          {/*A 'navbar-collapse' container containing navbar elements*/}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/*A list for page links within the navbar*/}
            <ul className="navbar-nav">
              {/* First page link: Employees*/}
              <li className="nav-item">
                <NavLink className='nav-link' to='/employees'>Employees</NavLink>
              </li>

              {/* Second page link: Departments */}
              <li className="nav-item">
                <NavLink className='nav-link' to='/departments'>Departments</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

//Export the HeaderComponent component so that it can be used in other files.
export default HeaderComponent;
