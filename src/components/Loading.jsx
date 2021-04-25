import React from 'react'
import './layouts/Loading.css'
import Gif from '../assets/loading.gif'

export default (props) => {
    return (
        <div className="Loading">
            <img src={Gif} alt="loading..." />
        </div>

    )
}