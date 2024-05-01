import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        navigate('/login', { replace: true });
    };

    const isAuthenticated = !!localStorage.getItem('authtoken');

    return (
        <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
            <div className="container">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    TradeSiml
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink exact="true" className="nav-link" activeclassname="active" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/market">
                                Market
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Profile
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="/profile">
                                        Profile
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="/transactions">
                                        Transactions
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="/favorites">
                                        Favorite Stocks
                                    </NavLink>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        )}
                        {isAuthenticated || (
                            <>
                                <li className="nav-item">
                                    <NavLink className="btn btn-primary shadow" role="button" to="/signup">
                                        Sign up
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-primary shadow mx-2" role="button" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
