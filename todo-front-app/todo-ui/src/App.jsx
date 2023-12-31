import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import FooterComponent from './component/FooterComponent'
import HeaderComponent from './component/HeaderComponent'
import ListTodoComponent from './component/ListTodoComponent'
import TodoComponent from './component/TodoComponent'
import RegisterComponent from './component/RegisterComponent'
import LoginComponent from './component/LoginComponent'
import './App.css'
import { isUserLoggedIn } from './services/AuthService'
import { useState } from 'react'


function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
    <BrowserRouter>
        <HeaderComponent />
          <Routes>
              {/* http://localhost:8080 */}
              <Route path='/' element = { <LoginComponent /> }></Route>
               {/* http://localhost:8080/todos */}
              <Route path='/todos' element = { 
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute> 
              }></Route>
              {/* http://localhost:8080/add-todo */}
              <Route path='/add-todo' element = { 
                <AuthenticatedRoute>
                <TodoComponent /> 
                </AuthenticatedRoute>
              }></Route>
              {/* http://localhost:8080/update-todo/1 */}
              <Route path='/update-todo/:id' element = { 
              <AuthenticatedRoute>
              <TodoComponent /> 
              </AuthenticatedRoute>
              }></Route>
               {/* http://localhost:8080/register */}
              <Route path='/register' element = { <RegisterComponent />}></Route>

               {/* http://localhost:8080/login */}
               <Route path='/login' element = { <LoginComponent /> }></Route>

          </Routes>
        <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App