import React from 'react'
import './layouts/EditCalendar.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class EditUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, loaded: false, name: this.props.event.atividade, type: "", time: "", messages: "", dataDay: "", dataMonth: "", dataYear: "" };
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDAYChange = this.handleDAYChange.bind(this);
        this.handleMONTHChange = this.handleMONTHChange.bind(this);
        this.handleYEARChange = this.handleYEARChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
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

    loadData = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getCalendarDetails(this.props.event._id.$oid);
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            var dataSplited = res.evento.dataProvavel.split("/")
            this.setState({ dataDay: dataSplited[0] });
            this.setState({ dataMonth: dataSplited[1] });
            this.setState({ dataYear: dataSplited[2] });
            this.setState({ type: res.evento.evento });
            this.setState({ time: res.evento.hora });
            this.setState({ messages: res.evento.recados });
            await this.ResponseHandler.trueResponse(res.token);
        }
        this.setState({ loaded: true });
        this.setState({ loading: false });
        console.log(res)
    }

    handleSubmit = async () => {
        this.setState({ loading: true })
        var date = this.state.dataDay + "/" + this.state.dataMonth + "/" + this.state.dataYear;
        var res = await this.FetchService.editCalendarDetails(
            this.props.event._id.$oid, 
            this.state.name, 
            this.state.type, 
            this.state.messages, 
            date, 
            this.state.time
        );
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informa????es foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser ??nico");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }

    handleDelete = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.deleteCalendarDetails(this.props.event._id.$oid);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informa????es foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser ??nico");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            alert("Usu??rio removido com sucesso");
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRowCalendar" key={this.props.event._id.$oid} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowTextCalendar">{this.props.event.atividade}</h2>
                        <h2 className="ListContentTableIndividualRowTextLastOneCalendar">{this.props.event.dataProvavel}</h2>
                    </li>
                }
                modal
                nested
            >
                {
                    this.state.loading === true
                        ?
                        <Loading />
                        :
                        close => (
                            <div className="EditCalendar">
                                <div className="header"> Editar evento </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <textarea className="TextFieldsInputs" placeholder={"Nome do usu??rio"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    {this.state.loaded === false
                                        ?
                                        <div className="line">
                                            <button className="buttonUpdate" onClick={this.loadData}>Carregar</button>
                                        </div>
                                        :
                                        <div>
                                            <div className="line">
                                                <h1 className="TextFields">Data Prov??vel</h1>
                                                <input className="TextFieldsInputs2" placeholder={"dia"} value={this.state.dataDay} onChange={this.handleDAYChange} maxLength="2" />
                                                <h1 className="TextFields2">-</h1>
                                                <input className="TextFieldsInputs2" placeholder={"m??s"} value={this.state.dataMonth} onChange={this.handleMONTHChange} maxLength="2" />
                                                <h1 className="TextFields2">-</h1>
                                                <input className="TextFieldsInputs2" placeholder={"ano"} value={this.state.dataYear} onChange={this.handleYEARChange} maxLength="2" />
                                            </div>
                                            <div className="line">
                                                <h1 className="TextFields">Tipo</h1>
                                                <select className="TextFieldsInputs" value={this.state.type} onChange={this.handleTypeChange}>
                                                    <option value="P??blico">P??blico</option>
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
                                            <button className="button" onClick={() => { close() }}>Gerar ATA</button>
                                        </div>
                                    }
                                </div>
                                <div className="actions">
                                    <button className="buttonDelete" onClick={this.handleDelete}>Deletar</button>
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="buttonUpdate" onClick={this.handleSubmit}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}