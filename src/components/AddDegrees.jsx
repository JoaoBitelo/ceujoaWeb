import React from 'react'
import './layouts/AddDegrees.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddDegrees extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", degree: "", order: ""};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDegreeChange(event) {
        this.setState({ degree: event.target.value.replace(/\D/, '') })
    }

    handleOrderChange(event) {
        this.setState({ order: event.target.value.replace(/\D/, '') })
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.addDegree(this.state.name, this.state.degree, this.state.order);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);;
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Popup
                trigger={<button className="button"> Adicionar </button>}
                modal
                nested
            >
                {
                    this.state.loading === true
                        ?
                        <Loading />
                        :
                        close => (
                            <div className="AddDegrees">
                                <button className="close" onClick={close}>&times;</button>
                                <div className="header"> Criar nova área de ensino </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome do usuário"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Grau minimo</h1>
                                        <input className="TextFieldsInputs" placeholder={"Apenas números"} value={this.state.degree} onChange={this.handleDegreeChange} maxLength="1" />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Ordenação</h1>
                                        <input className="TextFieldsInputs" placeholder={"Um número"} value={this.state.order} onChange={this.handleOrderChange} />
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="button" onClick={this.handleSubmit}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}