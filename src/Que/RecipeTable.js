import React from 'react'
import { Table, Button } from 'reactstrap'
import APIURL from '../helpers/environment'

const RecipeTable = (props) => {

    const deleteRecipe = (recipe) => {
        fetch(`${APIURL}/que/${props.category}/delete/${recipe.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => props.fetchRecipes())
            .catch(err => console.log(err))
    }
    const queMapper = () => {
        return props.recipe.map((que, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{que.id}</th>
                    <td>{que.ingredients}</td>
                    <td>{que.recipe}</td>
                    <td>{que.wood}</td>
                    <td>{que.temperature}</td>
                    <td>{que.cooktime}</td>
                    <td>
                        <Button color="warning" onClick={() => { props.editRecipe(que); props.updateOn() }}>Update</Button>
                        <Button color="danger" onClick={() => { deleteRecipe(que) }}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <h2>Favorite Recipes</h2>
            <hr />
            <Table striped style={{ background: "#939393" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ingredients</th>
                        <th>Recipe</th>
                        <th>Wood</th>
                        <th>Temperature</th>
                        <th>Cooktime</th>
                    </tr>
                </thead>
                <tbody>
                    {queMapper()}
                </tbody>
            </Table>
        </>
    )
}

export default RecipeTable