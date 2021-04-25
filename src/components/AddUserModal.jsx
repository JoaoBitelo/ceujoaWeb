import React from 'react'
import './layouts/AddUserModal.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", login: "", birthdayDAY: "", birthdayMONTH: "", birthdayYEAR: "", type: "user", degree: "" };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleBirthdayDAYChange = this.handleBirthdayDAYChange.bind(this);
        this.handleBirthdayMONTHChange = this.handleBirthdayMONTHChange.bind(this);
        this.handleBirthdayYEARChange = this.handleBirthdayYEARChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handleBirthdayDAYChange(event) {
        this.setState({ birthdayDAY: event.target.value.replace(/\D/, '') })
    }

    handleBirthdayMONTHChange(event) {
        this.setState({ birthdayMONTH: event.target.value.replace(/\D/, '') })
    }

    handleBirthdayYEARChange(event) {
        this.setState({ birthdayYEAR: event.target.value.replace(/\D/, '') })
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value });
    }

    handleDegreeChange(event) {
        this.setState({ degree: event.target.value.replace(/\D/, '') })
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var birthday = this.state.birthdayDAY + "/" + this.state.birthdayMONTH + "/" + this.state.birthdayYEAR
        var res = await this.FetchService.addUser(
            sessionStorage.getItem('login'),
            sessionStorage.getItem('token'),
            this.state.name,
            this.state.login,
            birthday,
            this.state.type,
            this.state.degree
        );
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
                                <div className="header"> Criar novo usuário </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome do usuário"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Login</h1>
                                        <input className="TextFieldsInputs" placeholder={"O login deve ser único"} value={this.state.login} onChange={this.handleLoginChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Aniversário</h1>
                                        <input className="TextFieldsInputs2" placeholder={"dia"} value={this.state.birthdayDAY} onChange={this.handleBirthdayDAYChange} maxLength="2" />
                                        <h1 className="TextFields2">-</h1>
                                        <input className="TextFieldsInputs2" placeholder={"mês"} value={this.state.birthdayMONTH} onChange={this.handleBirthdayMONTHChange} maxLength="2" />
                                        <h1 className="TextFields2">-</h1>
                                        <input className="TextFieldsInputs2" placeholder={"ano"} value={this.state.birthdayYEAR} onChange={this.handleBirthdayYEARChange} maxLength="2" />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Tipo</h1>
                                        <select className="TextFieldsInputs" value={this.state.type} onChange={this.handleTypeChange}>
                                            <option value="user">Usuário</option>
                                            <option value="adm">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Grau</h1>
                                        <input className="TextFieldsInputs" placeholder={"Apenas números"} value={this.state.degree} onChange={this.handleDegreeChange} maxLength="1" />
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