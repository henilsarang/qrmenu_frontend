import { Navbar, Nav, Container } from 'react-bootstrap';
import { useHistory, Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import React, { useContext, useEffect } from 'react';
import '../css/Navbar.css';
import $ from 'jquery';
import styled from 'styled-components';
const MainLayout = ({ children }) => {

    
    const history = useHistory();
    const auth = useContext(AuthContext);
    const onSignIn = () => {
        history.replace("/login")
    }


    
    


    const onRegister = () => {
        history.replace("/register")
    }
    const onSignOut = () => {
        auth.signOut();
        history.push('/login');
    }
    const goToPlaces = () => {
        history.push("/places")

    }


    return (
        <div>
        

                <Navbar bg="light" variant="light" className="mb-4">
                    <Navbar.Brand href="/">QR Menu</Navbar.Brand>
                    <Nav>
                        <li className="nav-item">
                        <Nav.Link className="nav-link" onClick={goToPlaces}>
                            <i className="far fa-clone">
                            </i>
                            Places
                        </Nav.Link>
                        </li>
                    </Nav>
                    <Nav className="flex-grow-1 justify-content-end">
                        {auth.token ? (<Nav.Link onClick={onSignOut}>Logout</Nav.Link>) : (
                            [
                            <Nav.Link className="nav-link" key={1} onClick={onSignIn}>Login</Nav.Link>,
                            <Nav.Link className="nav-link" key={2} onClick={onRegister}>Register</Nav.Link>
                        ]
                        )}
                    </Nav>
                </Navbar>
                <Container>
                    {children}
                </Container>
        </div>
    )
}

export default MainLayout;