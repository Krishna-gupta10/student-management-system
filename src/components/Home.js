import React from 'react';
import {Link} from 'react-router-dom'
import image1 from '../images/1.jpg'
import './Home.css'

export default function Home() {
    return (
        <>
            <h1 className="text-center" style={{ marginTop: '80px' }}>Welcome to Student Management System</h1>
            <div className="container" style={{ marginTop: '170px', display: 'flex', justifyContent: 'center' }}>

                <div className="card" style={{ width: '18rem', margin: '0 20px' }}>
                    <img src={image1} className="card-img-top" alt="..." />
                    <div className="text-center card-body my-2">
                        <Link to="/register" className="homebutton">Register New Student</Link>
                    </div>
                </div>

                <div className="card" style={{ width: '18rem', margin: '0 20px' }}>
                    <img src={image1} className="card-img-top" alt="..." />
                    <div className="text-center card-body my-2">
                        <Link to="/manage" className="homebutton">
                            Manage Students
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
