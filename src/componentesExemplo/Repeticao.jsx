import React from 'react'
import produtos from '../data/products'

export default (props) => {

    function getProdutos() {
        return produtos.map(p=> {
            return <li key={p.id}>{p.id} - {p.nome} - ${p.preco}</li>
        })
    }

    return (
        <div>
            <h2>Repetição</h2>
            <ul>
                {getProdutos()}
            </ul>
        </div>
    )
}