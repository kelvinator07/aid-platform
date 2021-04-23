import React from 'react'

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
}

const saveUserToLocalStorage = (data) => {
    let user = data.attributes;
    user.id = data.id;
    localStorage.setItem("name", user.firstname);
    localStorage.setItem("user", JSON.stringify(user));
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
    localStorage.removeItem("name");
}

export { setTokenToLocalStorage, removeTokenFromLocalStorage, saveUserToLocalStorage, getCurrentUser, signoutUser } ;