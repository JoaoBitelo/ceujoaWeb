import React from 'react'
import './layouts/Degree.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"
import AddDegrees from '../components/AddDegrees'
import EditDegrees from '../components/EditDegrees'

export default class Degree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, searchText: "", degrees: [] };
        this.searchText = this.searchText.bind(this);
        this.searchButton = this.searchButton.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        await this.getDegreesFromAPI();
        this.setState({ loading: false });
    }

    getDegreesFromAPI = async () => {
        var res = await this.FetchService.getAllDegrees();
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ degrees: res.graus });
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchButton = async () => {
        this.setState({ loading: true });
        await this.getDegreesFromAPI();
        if (this.state.searchText.length > 0) {
            var filteredDegrees = [];
            this.state.degrees.forEach(element => {
                if (element.nome.toUpperCase().includes(this.state.searchText.toUpperCase())) {
                    filteredDegrees.push(element);
                }
            });
            this.setState({ degrees: filteredDegrees })
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
            <div className="App">
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
                                        <h1 className="UsersText">Graus</h1>
                                        <AddDegrees history={this.props.history} />
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <input className="AddButtonTextfield" placeholder={"Nome do grau"} value={this.state.searchText} onChange={this.searchText} onKeyDown={this.handleKeyDown} />
                                        <button className="AddButton" onClick={this.searchButton}>Pesquisar</button>
                                    </div>
                                </div>
                                <div className="ListContent">
                                    <div className="ListContentTable">
                                        <div className="ListContentTableIndividualRowTittle">
                                            <h2 className="ListContentTableIndividualRowTextTittle">Nome</h2>
                                            <h2 className="ListContentTableIndividualRowTextTittle">Grau mínimo para acesso</h2>
                                            <h2 className="ListContentTableIndividualRowTextLastOneTittle">Valor para ordenação</h2>
                                        </div>
                                        {
                                            this.state.degrees.map((degree, index) => {
                                                return (
                                                    <EditDegrees key={degree.id.$oid} history={this.props.history} degree={degree} index={index} />
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