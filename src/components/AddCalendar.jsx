import React from 'react'
import './layouts/AddCalendar.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", type: "", time: "", messages: "", dataDay: "", dataMonth: "", dataYear: "" };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDAYChange = this.handleDAYChange.bind(this);
        this.handleMONTHChange = this.handleMONTHChange.bind(this);
        this.handleYEARChange = this.handleYEARChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDAYChange(event) {
        this.setState({ dataDay: event.target.value.replace(/\D/, '') })
    }

    handleMONTHChange(event) {
        this.setState({ dataMonth: event.target.value.replace(/\D/, '') })
    }

    handleYEARChange(event) {
        this.setState({ dataYear: event.target.value.replace(/\D/, '') })
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value });
    }

    handleTimeChange(event) {
        this.setState({ time: event.target.value });
    }

    handleMessageChange(event) {
        this.setState({ messages: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var date = this.state.dataDay + "/" + this.state.dataMonth + "/" + this.state.dataYear;
        var res = await this.FetchService.addCalendarDetails(
            this.state.name,
            this.state.type,
            this.state.messages,
            date,
            this.state.time
        );
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
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
                            <div className="AddCalendar">
                                <button className="close" onClick={close}>&times;</button>
                                <div className="header"> Criar novo evento </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <textarea className="TextFieldsInputs" placeholder={"Nome do evento"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Data Provável</h1>
                                        <input className="TextFieldsInputs2" placeholder={"dia"} value={this.state.dataDay} onChange={this.handleDAYChange} maxLength="2" />
                                        <h1 className="TextFields2">-</h1>
                                        <input className="TextFieldsInputs2" placeholder={"mês"} value={this.state.dataMonth} onChange={this.handleMONTHChange} maxLength="2" />
                                        <h1 className="TextFields2">-</h1>
                                        <input className="TextFieldsInputs2" placeholder={"ano"} value={this.state.dataYear} onChange={this.handleYEARChange} maxLength="2" />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Tipo</h1>
                                        <select className="TextFieldsInputs" value={this.state.type} onChange={this.handleTypeChange}>
                                            <option value="Público">Público</option>
                                            <option value="Privado">Privado</option>
                                        </select>
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Hora</h1>
                                        <input className="TextFieldsInputs" placeholder={"Hora do evento"} value={this.state.time} onChange={this.handleTimeChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Recados</h1>
                                        <textarea className="TextFieldsInputs" placeholder={"Recados"} value={this.state.messages} onChange={this.handleMessageChange} />
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