import React from 'react'
import './layouts/Contributions.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"
import AddContribution from '../components/AddContribution'
import EditContribution from '../components/EditContribution'

export default class Contributions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, searchText: "", contributions: [] };
        this.searchText = this.searchText.bind(this);
        this.searchButton = this.searchButton.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        await this.getContribuitionsFromAPI();
        this.setState({ loading: false });
    }

    getContribuitionsFromAPI = async () => {
        var res = await this.FetchService.getContribution();
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ contributions: res.contribuicoesAdicionais });
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchButton = async () => {
        this.setState({ loading: true });
        await this.getContribuitionsFromAPI();
        if (this.state.searchText.length > 0) {
            var filteredContributions = [];
            this.state.contributions.forEach(element => {
                if (element.nome.toUpperCase().includes(this.state.searchText.toUpperCase())) {
                    filteredContributions.push(element);
                }
            });
            this.setState({ contributions: filteredContributions })
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
            <div className="Contributions">
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
                                        <h1 className="UsersText">Contribuições</h1>
                                        <AddContribution history={this.props.history} />
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <input className="AddButtonTextfield" placeholder={"Nome da contribuição"} value={this.state.searchText} onChange={this.searchText} onKeyDown={this.handleKeyDown} />
                                        <button className="AddButton" onClick={this.searchButton}>Pesquisar</button>
                                    </div>
                                </div>
                                <div className="ListContent">
                                    <div className="ListContentTable">
                                        <div className="ListContentTableIndividualRowTittle">
                                            <h2 className="ListContentTableIndividualRowTextLastOneTittle">Nome</h2>
                                        </div>
                                        {
                                            this.state.contributions.map((contribution, index) => {
                                                return (
                                                    <EditContribution key={contribution.nome} history={this.props.history} contribution={contribution} index={index} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}