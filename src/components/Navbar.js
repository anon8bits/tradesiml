import React from 'react'
import {Link } from 'react-router-dom'

export default function Navbar() {
    // const location = useLocation();
    // if (location.pathname === '/login' || '/signup') {
    //     return null;
    //   }
    return (
        <>
            <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#702CF6' }} data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">TradeSiml</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/market">Market</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" style={{backgroundColor: 'white'}} type="search" placeholder="Search" aria-label="Search TradeSiml" />
                                <button type="submit" className="btn" style={{backgroundColor:'#F6CA2C', color: 'black'}}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
