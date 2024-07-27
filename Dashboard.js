import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/employee/');
                setEmployees(response.data);
                console.log('Employees:', response.data); // Debugging line
            } catch (error) {
                setError('Error fetching employees');
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!employees.length) return <div>No employees found.</div>;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="employee-list">
                <h2>Team Members</h2>
                <div className="employee-containers">
                    {employees.map(employee => (
                        <div className="employee-container" key={employee.emp_id}>
                            <Link to={`/employee/${employee.userid}`} className="employee-detail-link">
                                <img src="/path/to/common/image.jpg" alt="Employee Detail" />
                                <span>{employee.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
                <h2>Timesheets</h2>
                <div className="timesheet-containers">
                    {employees.map(employee => (
                        <div className="timesheet-container" key={employee.emp_id}>
                            <Link to={`/timesheet/${employee.userid}`} className="timesheet-detail-link">
                                <img src="/path/to/common/image.jpg" alt="Timesheet Detail" />
                                <span>Timesheet for {employee.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
