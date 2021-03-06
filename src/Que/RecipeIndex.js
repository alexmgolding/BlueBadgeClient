import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap'
import RecipeCreate from './RecipeCreate'
import RecipeTable from './RecipeTable'
import RecipeEdit from './RecipeEdit'
import APIURL from '../helpers/environment'

const RecipeIndex = props => {
    const [recipe, setRecipe] = useState([])
    const [updateActive, setUpdateActive] = useState(false)
    const [recipeToUpdate, setRecipeToUpdate] = useState({})

    const editRecipe = (que) => {
        setRecipeToUpdate(que)
        console.log(que)
    }

    const updateOn = () => {
        setUpdateActive(true)
    }

    const updateOff = () => {
        setUpdateActive(false)
    }

    const fetchRecipes = () => {
        fetch(`${APIURL}/que/${props.category}/getall`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json())
            .then(recipeData => {
                setRecipe(recipeData)
                console.log(recipeData)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchRecipes()
    }, [props.category])

    return (
        <Container className="recipeIndexBackground">
            <Row>
                <Col>
                    <ButtonGroup size="lg">
                        <Button style={{ background: '#8D9292', width: '190px' }} onClick={() => props.setCategory('Beef')}>Beef</Button>
                        <Button style={{ background: '#8D9292', width: '190px' }} onClick={() => props.setCategory('Pork')}>Pork</Button>
                        <Button style={{ background: '#8D9292', width: '190px' }} onClick={() => props.setCategory('Poultry')}>Poultry</Button>
                        <Button style={{ background: '#8D9292', width: '190px' }} onClick={() => props.setCategory('Seafood')}>Seafood</Button>
                        <Button style={{ background: '#8D9292', width: '190px' }} onClick={() => props.setCategory('Vegetable')}>Vegetables</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <RecipeCreate fetchRecipes={fetchRecipes} token={props.token} category={props.category} />
            </Row>
            <Row>
                <RecipeTable
                    recipe={recipe}
                    category={props.category}
                    fetchRecipes={fetchRecipes}
                    token={props.token}
                    editRecipe={editRecipe}
                    updateOn={updateOn}
                />
                {
                    updateActive
                        ?
                        <RecipeEdit recipeToUpdate={recipeToUpdate} updateOff={updateOff} token={props.token} fetchRecipes={fetchRecipes} category={props.category} />
                        :
                        null
                }
            </Row>
        </Container>
    )
}

export default RecipeIndex