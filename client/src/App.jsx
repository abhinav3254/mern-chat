import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AuthContext = createContext();

const App = () => {

    const [loggedInUser, SetLoggedInUser] = useState(null);

    useEffect(() => {
        SetLoggedInUser(sessionStorage.getItem('id'));
    })

    axios.defaults.baseURL = 'http://192.168.31.3:8080';
    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

    return (
        <AuthContext.Provider value={loggedInUser}>
            <div>
                {!loggedInUser && (
                    <Auth SetLoggedInUser={SetLoggedInUser} />
                )}
                {loggedInUser && (
                    <Home />
                )}
                <ToastContainer />
            </div>
        </AuthContext.Provider>
    )
}

export default App