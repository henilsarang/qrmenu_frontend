import {React, useState} from 'react';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { SignIn } from '../apis';
import MainLayout from '../layout/MainLayout';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onClick = () => {
        SignIn(username, password);
    };
    return (
        <MainLayout>
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                <Card>
                    <Card.Body>
                        <h3 className="text-center">
                            <b>LOGIN</b>
                        </h3>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}>
                            </Form.Control>
                            
                           
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Password</Form.Label>    
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                            </Form.Group>
                            <Button variant="standard" block onClick={onClick}>Sign In</Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </MainLayout>        
    )
}

export default Login;