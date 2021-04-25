import React from 'react'
import './layouts/EditContribution.css'
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

export default class EditContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: this.props.contribution.nome, contribution: this.props.contribution };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        var toBeIgnored = await this.editList();
        if (toBeIgnored !== false) {
            await this.editStatus(toBeIgnored);
        }
        this.props.history.go(0);
        this.setState({ loading: false });
    }

    editList = async () => {
        var toBeRemoved = []
        var toBeAdded = []
        if (myStore.state.users !== undefined) {
            if (myStore.state.users.length === 0) {
                alert("A lista de usuários foi modificada, mas a lista encontra-se vazia. Favor verificar")
                return false;
            } else {
                //verifica quem remover
                for (let i = 0; i < this.state.contribution.content.length; i++) {
                    if (myStore.state.users.includes(this.state.contribution.content[i].login) === false) {
                        toBeRemoved.push(this.state.contribution.content[i])
                    }
                }

                //verifica quem adicionar
                for (let j = 0; j < myStore.state.users.length; j++) {
                    var contained = false;
                    for (let k = 0; k < this.state.contribution.content.length; k++) {
                        if (myStore.state.users[j] === this.state.contribution.content[k].login) {
                            contained = true;
                            break;
                        }
                    }
                    if (contained === false) {
                        toBeAdded.push(myStore.state.users[j])
                    }
                }
            }
        }
        //remove
        var newToBeRemoved = {
            content: []
        }
        for (let l = 0; l < toBeRemoved.length; l++) {
            var item = {
                id: toBeRemoved[l].id
            }
            newToBeRemoved.content.push(item)
        }
        if (newToBeRemoved.content.length > 0) {
            await this.removeUser(newToBeRemoved)
        }
        //adiciona
        for (let m = 0; m < toBeAdded.length; m++) {
            await this.addUser(toBeAdded[m])
        }
        return toBeRemoved;
    }

    removeUser = async (newToBeRemoved) => {
        var res = await this.FetchService.deleteContribution(newToBeRemoved);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
        }
    }

    addUser = async (login) => {
        var res = await this.FetchService.addContribution(login, this.state.name);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
        }
    }

    editStatus = async (toBeIgnored) => {
        var toBeUpdated = this.state.contribution;
        for (let i = 0; i < toBeUpdated.content.length; i++) {
            for (let j = 0; j < toBeIgnored.length; j++) {
                if (toBeUpdated.content[i].login === toBeIgnored[j].login) {
                    toBeUpdated.content = toBeUpdated.content.filter((item) => item.login !== toBeIgnored[j].login);
                    break;
                }
            }
        }
        toBeUpdated.nome = this.state.name
        var res = await this.FetchService.editContribution(toBeUpdated);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    handleDelete = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.deleteContribution(this.state.contribution);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            alert("Usuário removido com sucesso");
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRow" key={this.state.contribution.nome} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowTextLastOne">{this.props.contribution.nome}</h2>
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
                            <div className="EditContribution">
                                <div className="header"> Editar Contribuição </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome do usuário"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Lista de usuários</h1>
                                    </div>
                                    {
                                        this.state.contribution.content.map((content, index) => {
                                            return (
                                                <div className="line">
                                                    <h1 className="TextFields">{content.login}</h1>
                                                    <select className="TextFieldsInputs" value={content.status} onChange={(e) => this.handleStatusChange(index, e)}>
                                                        <option value="PENDENTE">PENDENTE</option>
                                                        <option value="PAGO">PAGO</option>
                                                        <option value="ISENTO">ISENTO</option>
                                                    </select>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="line">
                                        <h1 className="TextFields">Edição da lista</h1>
                                    </div>
                                    <div className="line">
                                        <EditUsersOfContribution mergeState={myStore.mergeState.bind(myStore)} users={this.state.contribution.content} />
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="buttonDelete" onClick={this.handleDelete}>Deletar</button>
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="buttonUpdate" onClick={() => { this.handleSubmit(); close() }}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}