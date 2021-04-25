import React from 'react'
import './layouts/AddUserModal.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';
import EditUsersOfContribution from './EditUsersOfContribution'

function Store(initialState = {}) {
    this.state = initialState;
}
Store.prototype.mergeState = function (partialState) {
    Object.assign(this.state, partialState);
};

var myStore = new Store();

export default class AddContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleStatusChange(index, event) {
        var newC = this.state.contribution
        newC.content[index].status = event.target.value
        this.setState({ contribution: newC });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        if (myStore.state.users === undefined || myStore.state.users.length === 0) {
            alert("Nenhum usuário foi selecionado. Clique em 'editar' e adicione usuários a esta contribuição");
        } else {
            for (let index = 0; index < myStore.state.users.length; index++) {
                var res = await this.addOneByOne(myStore.state.users[index]);
                if (res === false || res === null) {
                    alert("Ocorreu um erro ao adicionar. Verifique sua conexão com a internet e se as informações foram devidamente preenchidas");
                } else {
                    await this.ResponseHandler.trueResponse(res);
                }
            }
        }
        this.props.history.go(0);
        this.setState({ loading: false });
    }

    addOneByOne = async (login) => {
        return this.FetchService.addContribution(login, this.state.name);
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
                                <div className="header"> Criar nova contribuição </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome da contribuição"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Lista de usuários</h1>
                                    </div>
                                    <div className="line">
                                        <EditUsersOfContribution mergeState={myStore.mergeState.bind(myStore)} />
                                    </div>

                                </div>
                                <div className="actions">
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="button" onClick={() => { this.handleSubmit(); close() }}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}