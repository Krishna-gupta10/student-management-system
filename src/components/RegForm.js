import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './RegForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        rollNo: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password != formData.confirmPassword) {
            alert("Passwords do not match!")
        }

        else {
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        rollNo: formData.rollNo,
                        password: formData.password,
                        contactNumber: formData.contactNumber,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log("Successfully Submitted", responseData);

                if (responseData.success) {
                    alert("Form submitted successfully!");
                    setFormData({
                        firstName: '',
                        lastName: '',
                        rollNo: '',
                        password: '',
                        confirmPassword: '',
                        contactNumber: '',
                    });
                } else {
                    alert("Form submission failed. Please try again.");
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Form submission failed. Please try again.");
            }
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit} style={{ marginTop: '80px' }}>
                <h3>Student Regsitration Form</h3>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rollNo">Roll No:</label>
                    <input
                        type="text"
                        id="rollNo"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-success" type="submit">Register</button>
            </form>

            <div className="text-center mt-3">
                <Link to="/"><button className="btn btn-primary">Go Back</button></Link>
            </div>

        </>
    );
};

export default RegistrationForm;
