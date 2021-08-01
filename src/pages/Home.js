import React from 'react';
import { Button,Jumbotron,Container,Row,Col,Image } from 'react-bootstrap';
import MainLayout from '../layout/MainLayout';
const Home = () => (
    <MainLayout>
        <Jumbotron className="bg-light">
            <Container>
                <Row>
                    <Col md={6} className="my-auto">
                        <h1><b>QR Code Menu</b></h1>
                        <h5 className="mt-4 mb-4">
                            A smart way to share your digital menu in a QR Code with your customer
                        </h5>
                        <br />
                        <Button href="/places" varaint="standard" size="lg">
                            Create Your Menu
                        </Button>
                    </Col>
                    <Col md={6} className="my-auto">
                        <Image src="https://d1i7h2skkdect3.cloudfront.net/wp-content/uploads/2020/07/Screen-Shot-2020-07-09-at-11.03.16-AM.png" rounded width="500" style={{ border:"1px solid black"}}>

                        </Image>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    </MainLayout>
);

export default Home;