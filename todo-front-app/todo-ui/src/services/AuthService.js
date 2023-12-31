//Axios library is being imported. Axios is a JavaScript library used to perform HTTP requests.
import axios from "axios"; 

//Defining the base URL of the authentication API.
const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth"

//The API call that will perform the registration process is defined.
export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

//The API call that will perform the login process is defined.
export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { usernameOrEmail, password});

//The function to save the token to localStorage is defined.
export const storeToken = (token) => localStorage.setItem("token", token);

//The function to get the token from localStorage is defined.
export const getToken = () => localStorage.getItem("token");

//The function of saving the logged in user's information to sessionStorage is defined.
export const saveLoggedInUser = (username,role) =>{
     sessionStorage.setItem("authenticatedUser", username);
     sessionStorage.setItem("role", role);
}
//The function to check whether the user is logged in or not is defined.
export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null) {
        return false;
    }    
    else {
        return true;
    }   
}
//Defining the function to get the logged in user's name.
export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}
//The logout function is defined. It clears localStorage and sessionStorage.
export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}
//The function of checking whether the user has administrative authority is defined.
export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");

    if(role != null && role === 'ROLE_ADMIN'){
        return true;
    }else{
        return false;
    }
}
