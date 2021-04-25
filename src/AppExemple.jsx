import React from 'react'
import './AppExemple.css'
import Primeiro from './componentesExemplo/Primeiro'
import ComParametro from './componentesExemplo/ComParametro'
import ComFilhos from './componentesExemplo/ComFilhos'
import Card from './componentesExemplo/Card'
import Repeticao from './componentesExemplo/Repeticao'
import Condicional from './componentesExemplo/Condicional'

export default (props) => {
    return (
        <div className="App">
            <Card titulo="Primeiro componente">
                <Primeiro />
            </Card>
            <Card titulo="Componente com parametros">
                <ComParametro titulo="Esse é o titulo" subtitulo="Esse é o subtitulo" />
            </Card>
            <Card titulo="Componente com filhos">
                <ComFilhos>
                    <ul>
                        <li>jao</li>
                        <li>jao2</li>
                        <li>jao3</li>
                    </ul>

                </ComFilhos>
            </Card>
            <Card titulo="Componente com repeticao dinamica">
                <Repeticao></Repeticao>
            </Card>
            <Card titulo="Componente com renderização condicional">
                <Condicional numero={11}></Condicional>
            </Card>
        </div>
    )
}