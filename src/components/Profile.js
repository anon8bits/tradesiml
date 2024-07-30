// src/components/ProfileComponent.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
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
        const newName = e.target.name.value;
        const nameRegex = /^(?!.* {3})[a-zA-Z ]{1,20}$/;
        if (!nameRegex.test(newName) || newName.split(" ").length - 1 > 2) {
            setAlertInfo({ message: 'Name should contain only alphabets and at most 2 whitespaces, and be no longer than 20 characters', type: 'error' });
            return;
        }
        setUserData(prevData => ({
            ...prevData,
            name: newName
        }));

        try {
            const token = await getAccessTokenSilently({
                audience: 'https://tradesiml.tech/',
                scope: 'email'
            });
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/updateUserInfo`,
                { newName },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setAlertInfo({ message: "User name updated successfully", type: "success" });
            } else {
                setAlertInfo({ message: response.message, type: "error" });
            }
        } catch (error) {
            setAlertInfo({ message: error.message || "An error occurred", type: "error" });
            setUserData(prevData => ({
                ...prevData,
                name: prevData.name
            }));
        }
        setIsEditing(false);
    };

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
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={userData.email}
                                    disabled
                                    className={styles.disabledInput}
                                />
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