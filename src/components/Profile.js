// src/components/ProfileComponent.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupText, Button } from "reactstrap";
import Loading from "./Loading.js";
import CustomAlert from './CustomAlert.js'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import styles from './css/Profile.module.css';

export const ProfileComponent = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [alertInfo, setAlertInfo] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const isGoogleUser = user?.sub?.startsWith('google-oauth2|');
    console.log(JSON.stringify(user));
    useEffect(() => {
        const userInfo = async () => {
            const token = await getAccessTokenSilently({
                audience: 'https://tradesiml.tech/',
                scope: 'email'
            });
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getUser`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setUserData(response.data);
        }
        userInfo();
    }, [isAuthenticated, getAccessTokenSilently])

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            name: e.target.name.value,
            email: isGoogleUser ? userData.email : e.target.email.value
        });
        setIsEditing(false);
    }

    const handlePasswordChange = async () => {
        if (isGoogleUser) {
            setAlertInfo({ message: 'Please use Google account!', type: 'error' });
            return;
        }
        try {
            setIsChangingPassword(true);
            const options = {
                method: 'POST',
                url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`,
                headers: { 'content-type': 'application/json' },
                data: {
                    client_id: process.env.REACT_APP_AUTH0_CLIENTID,
                    email: user.email,
                    connection: 'TradeSiml-MongoDB'
                }
            };
            const response = await axios.request(options);
            console.log(response);
            setAlertInfo({ message: 'Password reset link sent to email!', type: 'success' });
        } catch (error) {
            setAlertInfo({ message: error.message, type: 'error' });
        } finally {
            setIsChangingPassword(false);
        }
    }

    if (isLoading || !userData) {
        return <Loading />;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6} className="text-center">
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="rounded-circle mb-4"
                        style={{ width: "150px", height: "150px" }}
                    />
                    {isEditing ? (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name" className={styles.formLabel}>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={userData.name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" className={styles.formLabel}>Email</Label>
                                <InputGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        defaultValue={userData.email}
                                        disabled={isGoogleUser}
                                        className={isGoogleUser ? styles.disabledInput : ''}
                                    />
                                    {isGoogleUser && (
                                        <InputGroupText>
                                            <img
                                                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                                                alt="Google"
                                                className={styles.googleIcon}
                                            />
                                        </InputGroupText>
                                    )}
                                </InputGroup>
                            </FormGroup>
                            <button className={`${styles.button} ${styles.confirmButton}`} type="submit">Save</button>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleEdit}>Cancel</button>
                        </Form>
                    ) : (
                        <div className={styles.profileData}>
                            <h2 className={styles.profileField}>{userData.name}</h2>
                            <p className={styles.profileField}>{userData.email}</p>
                            <p className={styles.profileField}>Created at: {new Date(userData.date).toLocaleDateString()}</p>
                            <button className={`${styles.button} ${styles.editButton}`} onClick={handleEdit}>Edit Profile</button>
                            <button className={`${styles.button} ${styles.passwordButton}`} onClick={handlePasswordChange} disabled={isChangingPassword}>Change Password</button>
                        </div>
                    )}
                </Col>
            </Row>
            {alertInfo && (
                <CustomAlert
                    message={alertInfo.message}
                    onClose={() => setAlertInfo(null)}
                    type={alertInfo.type}
                />
            )}
        </Container>
    );
};

export default withAuthenticationRequired(ProfileComponent, {
    onRedirecting: () => <Loading />,
});
