import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import ErrorPage from './pages/auth/ErrorPage.jsx'
import UserInfo from './pages/user/userinfo.jsx'
import ProtectedRoute from './pages/auth/protectedRoute.jsx'

import Income from './pages/controllers/income/income.jsx'
import UserExpensePage from './pages/controllers/expenses/expense.jsx'
import Notes from './pages/controllers/notes/notes.jsx'
import Savings from './pages/controllers/savings/savings.jsx'
import Reports from './pages/controllers/reports/reports.jsx'
import Tabular from './pages/controllers/reports/reportstabular.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <UserInfo />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/income"
                    element={
                        <ProtectedRoute>
                            <Income />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/expenses"
                    element={
                        <ProtectedRoute>
                            <UserExpensePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <Notes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/savings"
                    element={
                        <ProtectedRoute>
                            <Savings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reportstabular"
                    element={
                        <ProtectedRoute>
                            <Tabular />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
