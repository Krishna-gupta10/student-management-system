import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import './Crud.css';

export default function Crud() {
    const [students, setStudents] = useState([]);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [editingStudent, setEditingStudent] = useState({
        id: '',
        efname: '',
        elname: '',
        erollNo: '',
        econtactNumber: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fetchStudents');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = (student) => {
        ref.current.click();
        setEditingStudent({
            id: student._id,
            efname: student.firstName,
            elname: student.lastName,
            erollNo: student.rollNo,
            econtactNumber: student.contactNumber,
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/updateStudent/${editingStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: editingStudent.efname,
                    lastName: editingStudent.elname,
                    rollNo: editingStudent.erollNo,
                    contactNumber: editingStudent.econtactNumber,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            refClose.current.click();

            const updatedDataResponse = await fetch('http://localhost:5000/api/fetchStudents');
            if (!updatedDataResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedData = await updatedDataResponse.json();
            setStudents(updatedData);

            setStudents((prevStudents) =>
                prevStudents.map((student) => (student._id === editingStudent.id ? { ...student, ...editingStudent } : student))
            );

            setEditingStudent({
                id: '',
                efname: '',
                elname: '',
                erollNo: '',
                econtactNumber: '',
            });

            alert("Student Data edited successfully!")
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/deleteStudent/${studentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
            alert("Deleted Successfully!")
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const onChange = (e) => {
        setEditingStudent({
            ...editingStudent,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <div className="container text-center">
            <h2 className="my-5">Registered Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Roll Number</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.rollNo}</td>
                            <td>{student.contactNumber}</td>
                            <td>
                                <button className="mx-2 btn btn-warning" onClick={() => handleUpdate(student)}><i className="fa-solid fa-pen"></i></button>
                                <button className="btn btn-danger" onClick={() => handleDelete(student._id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Note
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-7 mb-3">
                                <h6>First Name</h6>
                                <input
                                    type="text"
                                    id="efname"
                                    name="efname"
                                    className="form-control"
                                    value={editingStudent.efname}
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-md-7 mb-3">
                                <h6>Last Name</h6>
                                <input
                                    type="text"
                                    id="elname"
                                    name="elname"
                                    className="form-control"
                                    value={editingStudent.elname}
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-md-7 mb-3">
                                <h6>Roll Number</h6>
                                <input
                                    type="text"
                                    id="erollno"
                                    name="erollNo"
                                    className="form-control"
                                    value={editingStudent.erollNo}
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-md-7 mb-3">
                                <h6>Contact Number</h6>
                                <input
                                    type="text"
                                    id="econtactno"
                                    name="econtactNumber"
                                    className="form-control"
                                    value={editingStudent.econtactNumber}
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSave}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <Link to="/"><button className="btn btn-primary">Go Back</button></Link>
            </div>
        </div>
    );
}