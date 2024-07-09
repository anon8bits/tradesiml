import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./css/Navbar2.module.css";
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from './assets/logo.png';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar2 = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth0();

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setToggleNav(false);
    }
  };

  const closeMenu = () => {
    setToggleNav(false);
    setToggleDropdown(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav className={styles.nav}>
      <Link to="/home" className={styles.logoLink}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <div className={styles.mobileNav}>
        {isAuthenticated ? (
          <img
            src={user.picture}
            alt="User"
            className={styles.userImage}
            onClick={() => setToggleNav(!toggleNav)}
          />
        ) : (
          <div className={styles.hamburger} onClick={() => setToggleNav(!toggleNav)}>
            <MenuIcon />
          </div>
        )}
      </div>
      <div className={`${styles.navContent} ${toggleNav ? styles.active : ''}`}>
        <ul className={styles.navLinks}>
          <li><Link to="/" className={styles.links} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" className={styles.links} onClick={closeMenu}>About</Link></li>
          <li><Link to="/market" className={styles.links} onClick={closeMenu}>Market</Link></li>
          {isAuthenticated && (
            <>
              <li><Link to="/profile" className={styles.links} onClick={closeMenu}>Profile</Link></li>
              <li><Link to="/portfolio" className={styles.links} onClick={closeMenu}>Portfolio</Link></li>
              <li className={styles.mobileOnly}>
                <button className={`${styles.loginButton}`} onClick={() => logout()}>
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
        {!isAuthenticated ? (
          <Link to="/login" className={styles.loginButtonLink}>
            <button className={styles.loginButton}>
              <span>Login</span>
            </button>
          </Link>
        ) : (
          <div className={`${styles.userDropdown} ${styles.desktopOnly}`}>
            <img
              src={user.picture}
              alt="User"
              className={styles.userImage}
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className={styles.dropdownContent}>
                <Link to="/profile" className={styles.dropdownLink} onClick={closeMenu}>Profile</Link>
                <Link to="/portfolio" className={styles.dropdownLink} onClick={closeMenu}>Portfolio</Link>
                <button className={styles.logoutButton} onClick={() => logout()}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar2;