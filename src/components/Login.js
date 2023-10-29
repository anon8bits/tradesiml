import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert.js';
const Login = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const closeAlert = () => {
        setAlert(null); // Set alert to null to remove the alert
    };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authtoken', data.authtoken); // Store the token in localStorage
                navigate('/market');
                // Optionally, you can perform additional actions for a successful login
            } else {
                if (response.status === 400) {
                    setAlert({
                        type: 'danger',
                        message: 'Please login with correct credentials',
                    });
                }
            }
        } catch (error) {
            console.error('Error during login:', error.message || 'Network error');
        }
    };
    return (
        <>
            <Alert alert={alert} closeAlert={closeAlert} />
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-4 mb-lg-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Login</p>
                            <h2 className="fw-bold">Welcome</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-body text-center d-flex flex-column align-items-center">
                                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                        </svg>
                                    </div>
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="username" /></div>
                                        <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="current-password" /></div>
                                        <div className="mb-3"><button className="btn btn-primary shadow d-block w-100" type="submit">Login</button></div>
                                        <p className="text-muted">Create an account&nbsp;<Link to="/signup">Sign Up</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-dark">
                <div className="container py-4 py-lg-5">
                    <footer>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 footer-navigation">
                                <h3><a href="#">Company<span>logo </span></a></h3>
                                <p className="links"><a href="#">Home</a><strong> · </strong><a href="#">Blog</a><strong> · </strong><a href="#">Pricing</a><strong> · </strong><a href="#">About</a><strong> · </strong><a href="#">Faq</a><strong> · </strong><a href="#">Contact</a></p>
                                <p className="company-name">Company Name © 2015 </p>
                            </div>
                            <div className="col-sm-6 col-md-4 footer-contacts">
                                <div><span className="fa fa-map-marker footer-contacts-icon"> </span>
                                    <p><span className="new-line-span">21 Revolution Street</span> Paris, France</p>
                                </div>
                                <div><i className="fa fa-phone footer-contacts-icon"></i>
                                    <p className="footer-center-info email text-start"> +1 555 123456</p>
                                </div>
                                <div><i className="fa fa-envelope footer-contacts-icon"></i>
                                    <p> <a href="#" target="_blank">support@company.com</a></p>
                                </div>
                            </div>
                            <div className="col-md-4 footer-about">
                                <h4>About the creator</h4>
                                <p> Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet. </p>
                                <div className="social-links social-icons"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-linkedin"></i></a><a href="#"><i className="fa fa-github"></i></a></div>
                            </div>
                        </div>
                    </footer>
                    <hr />
                    <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                        <p className="mb-0">Copyright © 2023 TradeSiml</p>
                    </div>
                </div>
            </footer>
            <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="assets/js/bs-init.js"></script>
            <script src="assets/js/bold-and-dark.js"></script>
        </>
    )
}

export default Login
