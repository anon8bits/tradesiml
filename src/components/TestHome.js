import React from 'react'
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/font-awesome.min.css';
import '../assets/css/Pretty-Footer-.css';
import Image1 from '../assets/img/products/1.jpg';
import Image2 from '../assets/img/products/2.jpg';
import Image3 from '../assets/img/products/3.jpg'
const TestHome = () => {
    return (
        <>
            <header className="bg-dark">
                <div className="container pt-4 pt-xl-5">
                    <div className="row pt-5">
                        <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
                            <div className="text-center">
                                <p className="fw-bold text-success mb-2">Start Learning Trading</p>
                                <h1 className="fw-bold">The best way to learn the market is to jump into the market</h1>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="position-relative" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                <div style={{ position: 'relative', flex: '0 0 45%', transform: 'translate3d(-15%, 35%, 0)' }}>
                                    <img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.8" src={Image3} alt="Product 3" />
                                </div>
                                <div style={{ position: 'relative', flex: '0 0 45%', transform: 'translate3d(-5%, 20%, 0)' }}>
                                    <img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.4" src={Image2} alt="Product 2" />
                                </div>
                                <div style={{ position: 'relative', flex: '0 0 60%', transform: 'translate3d(0, 0%, 0)' }}>
                                    <img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.25" src={Image1} alt="Product 1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="py-5"></section>
            <section>
                <div className="container bg-dark py-5">
                    <div className="row">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Our Services</p>
                            <h3 className="fw-bold">What we can do for you</h3>
                        </div>
                    </div>
                    <div className="py-5 p-lg-5">
                        <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="col mb-5">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5" style={{ marginBottom: '-2px' }}>
                                        <h5 className="fw-bold card-title">Best Stocks Today</h5>
                                        <p className="text-muted card-text mb-4">Look at the top gainers and losers in the market today&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
                                        <button className="btn btn-primary shadow" type="button">Market</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <h5 className="fw-bold card-title">Portfolio Management</h5>
                                        <p className="text-muted card-text mb-4">Watch all your investments at the same place and evaluate your performance</p>
                                        <button className="btn btn-primary shadow" type="button">Your Portfolio</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section></section>
            <section className="py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2">Feedback</p>
                            <h2 className="fw-bold">Send your suggestions and feedback here</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div>
                                <form className="p-3 p-xl-4" method="post">
                                    <div className="mb-3"><input className="form-control" type="text" id="name-1" name="name" placeholder="Name" /></div>
                                    <div className="mb-3"><input className="form-control" type="email" id="email-1" name="email" placeholder="Email" /></div>
                                    <div className="mb-3"><textarea className="form-control" id="message-1" name="message" rows="6" placeholder="Message"></textarea></div>
                                    <div><button className="btn btn-primary shadow d-block w-100" type="submit">Send</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-4 d-flex justify-content-center justify-content-xl-start">
                            <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                                <div className="d-flex align-items-center p-3">
                                    <div className="px-2"></div>
                                </div>
                                <div className="d-flex align-items-center p-3">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-envelope">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                                        </svg>
                                    </div>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Email</h6>
                                        <p className="text-muted mb-0">priyanshukr19@gmail.com</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center p-3"></div>
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
                                <p className="links">
                                    <a href="#">Home</a><strong> · </strong>
                                    <a href="#">Blog</a><strong> · </strong>
                                    <a href="#">Pricing</a><strong> · </strong>
                                    <a href="#">About</a><strong> · </strong>
                                    <a href="#">Faq</a><strong> · </strong>
                                    <a href="#">Contact</a>
                                </p>
                                <p className="company-name">Company Name © 2015 </p>
                            </div>
                            <div className="col-sm-6 col-md-4 footer-contacts">
                                <div>
                                    <span className="fa fa-map-marker footer-contacts-icon"></span>
                                    <p><span className="new-line-span">21 Revolution Street</span> Paris, France</p>
                                </div>
                                <div>
                                    <i className="fa fa-phone footer-contacts-icon"></i>
                                    <p className="footer-center-info email text-start"> +1 555 123456</p>
                                </div>
                                <div>
                                    <i className="fa fa-envelope footer-contacts-icon"></i>
                                    <p><a href="#" target="_blank">support@company.com</a></p>
                                </div>
                            </div>
                            <div className="col-md-4 footer-about">
                                <h4>About the creator</h4>
                                <p> Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet. </p>
                                <div className="social-links social-icons">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                    <a href="#"><i className="fa fa-github"></i></a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </footer>
            <hr />
            <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                <p className="mb-0">Copyright © 2023 TradeSiml</p>
            </div>
            <script src="assets/bootstrap/js/bootstrap.min.js" />
            <script src="assets/js/bs-init.js" />
            <script src="assets/js/bold-and-dark.js" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cookie" />
        </>
    )
}

export default TestHome
