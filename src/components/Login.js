import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Container, Row } from 'reactstrap';
import APIURL from "../helpers/environment"
import Signup from './Signup'


const Login = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false)

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/que/user/signin`, {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password } }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then(
            (response => response.json())
        ).then((data) => {
            if (data.hasOwnProperty('error')) {
                setErrorMessage(data.error)
            }
            else {
                props.updateToken(data.sessionToken)
                setErrorMessage('')
            }
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <br />
                    <p style={{ fontSize: '25px', color: '#E8E8E8' }}>Here at Happy Grillmore we are backyard barbecuers, grilling enthusiasts, and foodies creating a community to share recipes with each other. If you would like to join Happy Grillmore please register below! </p>
                    <Signup updateToken={props.updateToken} />
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        {errorMessage === '' ? <> </> : <div style={{ background: "red" }} className="alert alert-danger" role="alert">
                            Username and password combination is incorrect. Please try again.</div>}
                        < FormGroup >
                            <h2 style={{ color: '#E8E8E8' }}>Login</h2>
                            <Label className="welcomeUsername" htmlFor="username">Username</Label>
                            <Input onChange={(e) => setUserName(e.target.value)} name="username" value={username} placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label className="welcomePassword" htmlFor="password">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password" />
                        </FormGroup>
                        <Button style={{ width: "90px", alignitems: 'left' }} type="submit" >Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}
export default Login;