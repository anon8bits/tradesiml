import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/market">Market</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/portfolio">Portfolio</Link></li>
                        </ul>
                        <Link className="btn btn-primary shadow" role="button" to="/signup">Sign up</Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
    