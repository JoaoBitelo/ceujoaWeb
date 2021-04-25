import React from 'react'
import './layouts/Financials.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"
import EditFinancialsMonthly from '../components/EditFinancials'

export default class FinancialsMonthly extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, searchText: "", users: [] };
        this.searchText = this.searchText.bind(this);
        this.searchButton = this.searchButton.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        await this.getUsersFromAPI();
        this.setState({ loading: false });
    }

    getUsersFromAPI = async () => {
        var res = await this.FetchService.getAllUsers();
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ users: res.usuarios });
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchButton = async () => {
        this.setState({ loading: true });
        await this.getUsersFromAPI();
        if (this.state.searchText.length > 0) {
            await this.getUsersFromAPI();
            var filteredUsers = [];
            this.state.users.forEach(element => {
                if (element.nome.toUpperCase().includes(this.state.searchText.toUpperCase())) {
                    filteredUsers.push(element);
                }
            });
            this.setState({ users: filteredUsers })
        }
        this.setState({ loading: false });
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.searchButton();
        }
    }

    render() {
        return (
            <div className="FinancialsMonthly">
                {
                    //header
                }
                <Header />
                <div className="UsersContent">
                    <Sidebar history={this.props.history} />
                    {
                        //conteudo da tela
                    }
                    {
                        this.state.loading
                            ?
                            <Loading />
                            :
                            <div className="Contents">
                                <div className="ButtonsContent">
                                    <div className="ButtonsContentRow">
                                        <h1 className="UsersText">Mensalidades</h1>
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <input className="AddButtonTextfield" placeholder={"Nome do usuário"} value={this.state.searchText} onChange={this.searchText} onKeyDown={this.handleKeyDown} />
                                        <button className="AddButton" onClick={this.searchButton}>Pesquisar</button>
                                    </div>
                                </div>
                                <div className="ListContent">
                                    <div className="ListContentTable">
                                        <div className="ListContentTableIndividualRowTittle">
                                            <h2 className="ListContentTableIndividualRowTextTittle">Nome</h2>
                                            <h2 className="ListContentTableIndividualRowTextTittle">Tipo</h2>
                                            <h2 className="ListContentTableIndividualRowTextLastOneTittle">Grau</h2>
                                        </div>
                                        {
                                            this.state.users.map((user, index) => {
                                                return (
                                                    <EditFinancialsMonthly key={user._id.$oid} history={this.props.history} user={user} index={index} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="FiltersContent">
                                        <h2 className="FiltersContentButtons">Todos</h2>
                                        <h2 className="FiltersContentButtons">Administrador</h2>
                                        <h2 className="FiltersContentButtons">Usuário</h2>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}