import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const { emp_id } = useParams();  // emp_id is a string
    const [employee, setEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employee/?employee_id=${emp_id}`)
            .then(response => {
                // Check if the response is an array or an object
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setEmployee(response.data[0]);
                } else {
                    setEmployee(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching employee details:', error);
            });
    }, [emp_id]);

    if (!employee) {
        return <div>Loading...</div>;
    }
    const filteredEmployees = employee.filter(emp =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.userid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Use optional chaining to avoid errors if properties are undefined
    return (
        <div>
            <div className="welcome">Welcome to Employee Dashboard</div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by ID or Name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="table-container">
                <table className="table">
            <h1>Employee Detail for {employee?.employee?.name || 'N/A'}</h1>
            <p>Employee ID: {employee?.employee?.userid || 'N/A'}</p>
            <p>Date: {employee?.date || 'N/A'}</p>
            <p>Comments: {employee?.comments || 'N/A'}</p>
            <p>Lead Approval: {employee?.lead_approval || 'N/A'}</p>
            </table>
            
            
            <tbody>
                        {filteredEmployees.map(emp => (
                            <tr key={employee.userid}>
                                <td>{employee.userid}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.comments}</td>
                                <td className={
                                    employee.lead_approval === 'Approved' ? 'status-approved' :
                                    employee.lead_approval === 'Rejected' ? 'status-rejected' :
                                    'status-pending'
                                }>
                                    {employee.lead_approval}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            <Link to="/abc">Back to Dashboard</Link>
        </div>
        
      </div>
    );
};

export default EmployeeDetails;
