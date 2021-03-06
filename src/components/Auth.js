import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';

const Auth = (props) => {
    return (
        <Container className="auth-container">
            <Row>
                <Col>
                    <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;