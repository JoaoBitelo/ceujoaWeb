import React from 'react'
import './layouts/EditUsersOfContribution.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';

export default class EditUsersOfContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, users: [], };
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        this.setState({ users: [] });
        var res = await this.FetchService.getAllUsers();
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            await this.createArray(res.usuarios);
        }
        this.setState({ loading: false });
    }

    createArray = async (users) => {
        var newUsers = [];

        //adiciona da api
        for (let i = 0; i < users.length; i++) {
            var item = {
                nome: users[i].nome,
                checked: false,
                id: users[i]._id.$oid,
                login: users[i].login
            }
            //herda da ultima pagina
            if (this.props.users !== undefined) {
                for (let j = 0; j < this.props.users.length; j++) {
                    if (this.props.users[j].login === item.login) {
                        item.checked = true
                        break;
                    }
                }
            }
            newUsers.push(item);
        }
        this.setState({ users: newUsers });
    }

    handleCheck(index) {
        var newP = this.state.users
        if (newP[index].checked === false) {
            newP[index].checked = true
        } else {
            newP[index].checked = false
        }
        this.setState({ users: newP });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var newV = []
        for (let index = 0; index < this.state.users.length; index++) {
            if (this.state.users[index].checked === true) {
                newV.push(this.state.users[index].login);
            }
        }
        this.props.mergeState({ users: newV })
        this.setState({ loading: false });
    }

    render() {
        return (
            <Popup
                trigger={<button className="button"> Editar </button>}
                modal
                nested
            >
                {
                    this.state.loading === true
                        ?
                        <Loading />
                        :
                        close => (
                            <div className="modalContribution">
                                <div className="header"> Lista de usuários </div>
                                <div className="contents">
                                    <div className="liness">
                                        <h1 className="TextFieldss">Nome do usuário</h1>
                                        <h1 className="TextFieldss">Adicionar?</h1>
                                    </div>
                                    {
                                        this.state.users.map((user, index) => {
                                            return (
                                                <div className="liness" key={user.id} style={{ backgroundColor: index % 2 === 0 ? "#82ce94" : "none" }}>
                                                    <h1 className="TextFieldss">{user.nome}</h1>
                                                    <input className="checkboxs" type="checkbox" checked={user.checked} onChange={() => this.handleCheck(index)} />
                                                </div>
                                            )
                                        })
                                    }
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