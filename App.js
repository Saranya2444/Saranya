// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import EmployeeDetail from './EmployeeDetails';
import EmployeeTimesheet from './EmployeeTimesheet';
import Login from './Login';





function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/abc" element={<Dashboard/>} />
                    <Route exact path="/employee" element={<EmployeeDetail />} />
                    <Route exact path="/timesheet" element={<EmployeeTimesheet />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
