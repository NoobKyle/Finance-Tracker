import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import ErrorPage from './pages/auth/ErrorPage.jsx'
import './index.css'
import UserInfo from './pages/user/userinfo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ErrorPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/user" element={<UserInfo />} />

            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
