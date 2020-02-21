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
                    <th style={{ color: '#EAE2B7' }} scope="row">{que.id}</th>
                    <td style={{ color: '#EAE2B7' }}>{que.ingredients}</td>
                    <td style={{ color: '#EAE2B7' }}>{que.recipe}</td>
                    <td style={{ color: '#EAE2B7' }}>{que.wood}</td>
                    <td style={{ color: '#EAE2B7' }}>{que.temperature}</td>
                    <td style={{ color: '#EAE2B7' }}>{que.cooktime}</td>
                    <td>
                        <Button color="warning" onClick={() => { props.editRecipe(que); props.updateOn() }}>Update</Button>
                        <Button color="danger" style={{ width: '75px' }} onClick={() => { deleteRecipe(que) }}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <h2 className="tableName">Pitmaster Recipes</h2>
            <Table striped style={{ background: "#838795" }}>
                <thead>
                    <tr>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>#</th>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>Ingredients</th>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>Recipe</th>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>Wood</th>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>Temperature</th>
                        <th style={{ color: '#EAE2B7', fontFamily: 'Roboto' }}>Cooktime</th>
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