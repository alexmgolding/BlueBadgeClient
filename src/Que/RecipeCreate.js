import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import APIURL from '../helpers/environment';

const RecipeCreate = (props) => {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [wood, setWood] = useState('');
    const [temperature, setTemperature] = useState('');
    const [cooktime, setCooktime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${APIURL}/que/${props.category}/submitrecipe`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ meatlog: { ingredients: ingredients, recipe: recipe, wood: wood, temperature: temperature, cooktime: cooktime } })
        })
            .then(res => res.json())
            .then(logData => {
                console.log(logData)
                setIngredients('')
                setRecipe('')
                setWood('')
                setTemperature('')
                setCooktime('')
                props.fetchRecipes()
            })
    }

    return (
        <Container>
            <br />
            <h2 className="createRecipeHeader"> {props.category} Recipe</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label className="recipeCreateIngredients" className="label" htmlFor='ingredients'>Ingredients</Label>
                    <Input onChange={(e) => { setIngredients(e.target.value) }} name='text' value={ingredients} type="textarea">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label className="recipeCreateRecipe" htmlFor='recipe'>Recipe</Label>
                    <Input onChange={(e) => { setRecipe(e.target.value) }} name='recipe' value={recipe} type="textarea" name="text">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='wood' />
                    <Input onChange={(e) => { setWood(e.target.value) }} type='select' name='wood' value={wood}>
                        <option value=''>Select Wood Type</option>
                        <option value='Apple'>Apple</option>
                        <option value='Hickory'>Hickory</option>
                        <option value='Oak'>Oak</option>
                        <option value='Cherry'>Cherry</option>
                        <option value='Mesquite'>Mesquite</option>
                        <option value='Post Oak'>Post Oak</option>
                        <option value='Pecan'>Pecan</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label className="recipeCreateTemp" htmlFor='temperature'>Temperature ºF</Label>
                    <Input onChange={(e) => { setTemperature(e.target.value) }} name='temperature'>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label className="recipeCreateCooktime" htmlFor='cooktime'>Cooktime</Label>
                    <Input onChange={(e) => { setCooktime(e.target.value) }} name='cooktime' value={cooktime}>
                    </Input>
                </FormGroup>
                <Button color="success" type='submit'>Submit Recipe</Button>
            </Form>
        </Container>
    )
}

export default RecipeCreate;