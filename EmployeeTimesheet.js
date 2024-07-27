import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeTimesheet.css'

const EmployeeTimesheet = () => {
    const { emp_id } = useParams();
    const [timesheets, setTimesheets] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredtimesheets, setFilteredTimesheets] = useState([]);

    useEffect(() => {
        // Fetch employee details
        axios.get(`http://localhost:8000/api/employee/?employee_id=${emp_id}`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee details:', error);
            });

        // Fetch timesheets for the employee
        axios.get(`http://localhost:8000/api/timesheet/?employee=${emp_id}`)
            .then(response => {
                setTimesheets(response.data);
            })
            .catch(error => {
                console.error('Error fetching timesheets:', error);
            });
    }, [emp_id]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = timesheets.filter(timesheet => 
            timesheet.employee_name.toLowerCase().includes(e.target.value.toLowerCase()) || 
            timesheet.employee_id.toString().includes(e.target.value)
        );
        setFilteredTimesheets(filtered);
    };

    // Function to approve a timesheet
    const approveTimesheet = (timesheetId) => {
        console.log(`Approving timesheet with ID: ${timesheetId}`); // Debugging line
        axios.post(`http://localhost:8000/api/timesheet/${timesheetId}/approve/`)
            .then(response => {
                // Update timesheets state after approval
                const updatedTimesheets = timesheets.map(timesheet => {
                    if (timesheet.id === timesheetId) {
                        return {
                            ...timesheet,
                            lead_approval: 'Approved'
                        };
                    }
                    return timesheet;
                });
                setTimesheets(updatedTimesheets);
                console.log('Timesheet approved:', response.data);
                setFilteredTimesheets(updatedTimesheets);
            })
            .catch(error => {
                console.error('Error approving timesheet:', error);
            });
    };

    // Function to reject a timesheet
    const rejectTimesheet = (timesheetId) => {
        console.log(`Rejecting timesheet with ID: ${timesheetId}`); // Debugging line
        axios.post(`http://localhost:8000/api/timesheet/${timesheetId}/reject/`)
            .then(response => {
                // Update timesheets state after rejection
                const updatedTimesheets = timesheets.map(timesheet => {
                    if (timesheet.id === timesheetId) {
                        return {
                            ...timesheet,
                            lead_approval: 'Rejected'
                        };
                    }
                    return timesheet;
                });
                setTimesheets(updatedTimesheets);
                
                console.log('Timesheet rejected:', response.data);
                setFilteredTimesheets(updatedTimesheets);
            })
            .catch(error => {
                console.error('Error rejecting timesheet:', error);
            });
    };

    return (
        <div className="timesheet-container">
        <h1>Welcome to Employee Timesheet</h1>
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search by Employee ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
            />
            <i className="fas fa-search"></i>
        </div>
        <div>

            <h1>Timesheets for {employee ? employee.name : 'Loading...'}</h1>
            <table border="1" className="timesheet-table">
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Total</th>
                        <th>Approval</th>
                    </tr>
                </thead>
                <tbody>
                {filteredtimesheets.map(timesheet => (
                    
                        <tr key={timesheet.id}>
                            <td>{timesheet.week}</td>
                            <td>{timesheet.mon}</td>
                            <td>{timesheet.tue}</td>
                            <td>{timesheet.wed}</td>
                            <td>{timesheet.thu}</td>
                            <td>{timesheet.fri}</td>
                            <td>{timesheet.total}</td>
                            <td>
                                {timesheet.lead_approval === 'Pending' ? (
                                    <>
                                        <button onClick={() => approveTimesheet(timesheet.id)}>Approve</button>
                                        <button onClick={() => rejectTimesheet(timesheet.id)}>Reject</button>
                                    </>
                                ) : (
                                    timesheet.lead_approval
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/abc">Back to Dashboard</Link>
        </div>
        </div>
    );
};

export default EmployeeTimesheet;
