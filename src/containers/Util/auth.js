import React from 'react'

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
}

export default setTokenToLocalStorage;