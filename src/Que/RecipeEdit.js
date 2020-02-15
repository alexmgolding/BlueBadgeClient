import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import APIURL from '../helpers/environment'

const RecipeEdit = (props) => {
    const [editIngredients, setEditIngredients] = useState(props.recipeToUpdate.ingredients)
    const [editRecipe, setEditRecipe] = useState(props.recipeToUpdate.recipe)
    const [editWood, setEditWood] = useState(props.recipeToUpdate.wood)
    const [editTemp, setEditTemp] = useState(props.recipeToUpdate.temperature)
    const [editCooktime, setEditCooktime] = useState(props.recipeToUpdate.cooktime)

    const updateCurrent = (event) => {
        event.preventDefault()
        console.log(props.recipeToUpdate.id)
        fetch(`${APIURL}/que/${props.category}/update/${props.recipeToUpdate.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ meatlog: { ingredients: editIngredients, recipe: editRecipe, wood: editWood, temperature: editTemp, cooktime: editCooktime } })
        }).then(res => { props.fetchRecipes(); props.updateOff() })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader>Edit Recipe</ModalHeader>
            <ModalBody onSubmit={updateCurrent}>
                <Form>
                    <FormGroup>
                        <Label htmlFor='ingredients'>Update Ingredients</Label>
                        <Input name='ingredients' value={editIngredients} onChange={(e) => setEditIngredients(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='recipe'>Update Recipe</Label>
                        <Input name='recipe' value={editRecipe} onChange={(e) => setEditRecipe(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='wood'>Update Type of Wood</Label>
                        <Input name='wood' value={editWood} onChange={(e) => setEditWood(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='temperature'>Update Temperature</Label>
                        <Input name='temperature' value={editTemp} onChange={(e) => setEditTemp(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='cooktime'>Update Cooktime</Label>
                        <Input name='cooktime' value={editCooktime} onChange={(e) => setEditCooktime(e.target.value)} />
                    </FormGroup>
                    <Button type='submit'>Update Your Recipe</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default RecipeEdit