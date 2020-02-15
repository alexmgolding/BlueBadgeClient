import React, { useState } from 'react'
import { Jumbotron, Button, Row, Col, Container } from 'reactstrap'
import BBQCarousel from './BBQCarousel'
import RecipeIndex from '../Que/RecipeIndex'

const Home = (props) => {
    const [sessionToken, setSessionToken] = useState(props.token)
    const [category, setCategory] = useState('beef')
    const [landingPage, setLandingPage] = useState(true)

    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setSessionToken(newToken);
        console.log(newToken);
    }
    let recipeTables = () => {
        setLandingPage(false)
    }
    let clearToken = () => {
        localStorage.clear();
        setSessionToken('');
    }

    return (
        !landingPage ? <RecipeIndex token={sessionToken} category={category} setCategory={setCategory} /> :
            <div className="home-div">
                <Container>
                    <Row>
                        <Jumbotron className="home-jumbo" style={{ color: "white" }}>
                            <h1>Welcome to Happy Grillmore</h1>
                            <p>At Happy Grillmore we pride ourselves by compiling different recipes from different categories to enhance everyone's backyard barbecue experience.</p>
                            <hr />
                            <p>Please take a look around our recipes and feel free to submit your own award winning recipe. Enjoy!</p>
                            <p>
                                <Button color="secondary" type="submit" onClick={() => recipeTables()}>View Recipes</Button>
                            </p>
                        </Jumbotron>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md='2'></Col>
                        <Col md='8'>
                            <BBQCarousel />
                        </Col>
                        <Col md='2'></Col>
                    </Row>
                </Container>
            </div >
    );
}
export default Home