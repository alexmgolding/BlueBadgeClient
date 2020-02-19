import React, { useState } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
import APIURL from "../helpers/environment"

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
        <div className="container-fluid">
            <h1 className="welcome">Welcome Back</h1>
            <Form onSubmit={handleSubmit}>
                {errorMessage == '' ? <> </> : <div style={{ background: "red" }} className="alert alert-danger" role="alert">
                    Username and password combination is incorrect. Please try again.</div>}
                < FormGroup >
                    <Label className="welcomeUsername" htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUserName(e.target.value)} name="username" value={username} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <Label className="welcomePassword" htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password" />
                </FormGroup>
                <Button style={{ width: "90px", alignitems: 'left' }} type="submit" >Login</Button>
            </Form>
        </div >
    )
}
export default Login;