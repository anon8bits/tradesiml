import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AuthCheck = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            const fName = user.name.split(' ')[0];
            const lName = user.name.split(' ')[1];
            axios.post('http://localhost:5000/api/auth/createuser', { fname: fName, lname: lName, email: user.email })
                .catch((error) => console.error('Error saving user to database', error));
        }
    }, [isAuthenticated, user]);

    return <>{children}</>;
};

export default AuthCheck;
