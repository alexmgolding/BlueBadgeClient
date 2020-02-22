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
                    <th style={{ color: '#E8E8E8' }} scope="row">{que.id}</th>
                    <td style={{ color: '#E8E8E8' }}>{que.ingredients}</td>
                    <td style={{ color: '#E8E8E8' }}>{que.recipe}</td>
                    <td style={{ color: '#E8E8E8' }}>{que.wood}</td>
                    <td style={{ color: '#E8E8E8' }}>{que.temperature}</td>
                    <td style={{ color: '#E8E8E8' }}>{que.cooktime}</td>
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
            <Table striped style={{ background: "#7C8282" }}>
                <thead>
                    <tr>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>#</th>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>Ingredients</th>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>Recipe</th>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>Wood</th>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>Temperature</th>
                        <th style={{ color: '#E8E8E8', fontFamily: 'Roboto', fontSize: '25px' }}>Cooktime</th>
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