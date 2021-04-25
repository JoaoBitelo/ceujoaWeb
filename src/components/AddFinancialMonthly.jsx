import React from 'react'
import './layouts/AddFinancialMonthly.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddFinancial extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, userLogin: this.props.user.login, name: "" };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.addMonthly(this.props.user.login, this.state.name);
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
                            <div className="modal">
                                <button className="close" onClick={close}>&times;</button>
                                <div className="header"> Adicionar novo ano de mensalidades</div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Ano</h1>
                                        <input className="TextFieldsInputs" placeholder={"Ano da mensalidade"} value={this.state.name} onChange={this.handleNameChange} />
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