import React from 'react';

function TestNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        {/* ... (your previous brand content) */}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="/market">Market</a></li>
                            {/* Add the rest of the navigation links here */}
                            <li className="nav-item"><a className="nav-link" href="/contacts">Contacts</a></li>
                        </ul>
                        <a className="btn btn-primary shadow" role="button" href="/signup">Sign up</a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default TestNavbar;
