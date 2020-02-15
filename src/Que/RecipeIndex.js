import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap'
import RecipeCreate from './RecipeCreate'
import RecipeTable from './RecipeTable'
import RecipeEdit from './RecipeEdit'

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
        fetch(`http://localhost:4000/que/${props.category}/getall`, {
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
                        <Button onClick={() => props.setCategory('beef')}>Beef</Button>
                        <Button onClick={() => props.setCategory('pork')}>Pork</Button>
                        <Button onClick={() => props.setCategory('poultry')}>Poultry</Button>
                        <Button onClick={() => props.setCategory('seafood')}>Seafood</Button>
                        <Button onClick={() => props.setCategory('vegetable')}>Vegetables</Button>
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