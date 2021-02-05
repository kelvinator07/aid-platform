import React from 'react'

const setUser = (user) => {
    
}

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
}

const saveUserToLocalStorage = (data) => {
    localStorage.setItem("name", data.firstname);
    localStorage.setItem("user", JSON.stringify(data));
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
}

const signoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Signed out 2")
}

export { setTokenToLocalStorage, removeTokenFromLocalStorage, saveUserToLocalStorage, getCurrentUser, signoutUser } ;