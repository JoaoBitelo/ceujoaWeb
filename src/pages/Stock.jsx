import React from 'react'
import './layouts/Stock.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"
import AddStockitemModal from '../components/AddStockitemModal'
import EditStockitemModal from '../components/EditStockitemModal'

export default class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, searchText: "", stock: [] };
        this.searchText = this.searchText.bind(this);
        this.searchButton = this.searchButton.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        await this.getFullStock();
        this.setState({ loading: false });
    }

    getFullStock = async () => {
        var res = await this.FetchService.getStock();
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ stock: res.materiais });
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchButton = async () => {
        this.setState({ loading: true });
        await this.getFullStock();
        if (this.state.searchText.length > 0) {
            var filteredMaterials = [];
            this.state.stock.forEach(element => {
                if (element.nome.toUpperCase().includes(this.state.searchText.toUpperCase())) {
                    filteredMaterials.push(element);
                }
            });
            this.setState({ stock: filteredMaterials })
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
            <div className="Stock">
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
                                        <h1 className="UsersText">Material</h1>
                                        <AddStockitemModal history={this.props.history} />
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <input className="AddButtonTextfield" placeholder={"Nome do material"} value={this.state.searchText} onChange={this.searchText} onKeyDown={this.handleKeyDown} />
                                        <button className="AddButton" onClick={this.searchButton}>Pesquisar</button>
                                    </div>
                                </div>
                                <div className="ListContent">
                                    <div className="ListContentTable">
                                        <div className="ListContentTableIndividualRowTittle">
                                            <h2 className="ListContentTableIndividualRowTextTittle">Nome</h2>
                                            <h2 className="ListContentTableIndividualRowTextTittle">Necessidade</h2>
                                            <h2 className="ListContentTableIndividualRowTextLastOneTittle">Estoque</h2>
                                        </div>
                                        {
                                            this.state.stock.map((item, index) => {
                                                return (
                                                    <EditStockitemModal key={item._id.$oid} history={this.props.history} item={item} index={index} />
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