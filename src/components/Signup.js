import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';

const Signup = (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/que/user/createuser`, {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password } }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <br />
            <Button style={{ position: "absolute", left: '33px', width: "90px" }} color="success" onClick={toggle}>Register</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>SignUp</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="username">Email</Label>
                            <Input onChange={(e) => setUserName(e.target.value)} name="username" value={username} placeholder="Username" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password" minLength='5' />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle} type="submit">SignUp</Button>
                        <Button color="danger" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Signup;