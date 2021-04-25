import React from 'react'
import './layouts/Norms.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"

export default class Norms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, estatuto: "", regimento: "", cartaPrincipios: "", cartaMagma: "" };
        this.handleChangeEstatuto = this.handleChangeEstatuto.bind(this);
        this.handleChangeRegimento = this.handleChangeRegimento.bind(this);
        this.handleChangeCartaPrincipios = this.handleChangeCartaPrincipios.bind(this);
        this.handleChangeCartaMagma = this.handleChangeCartaMagma.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        //get estatuto
        var res = await this.getLink("EstatutoSocial");
        this.setState({ estatuto: res.content.link });
        //get regimento
        res = await this.getLink("RegimentoInterno");
        this.setState({ regimento: res.content.link });
        //get principios
        res = await this.getLink("CartaDePrincipios");
        this.setState({ cartaPrincipios: res.content.link });
        //get magma
        res = await this.getLink("CartaMagna");
        this.setState({ cartaMagma: res.content.link });
        this.setState({ loading: false });
    }

    getLink = async (name) => {
        var res = await this.FetchService.getContent(name);
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            return res;
        }
    }

    handleChangeEstatuto(event) {
        this.setState({ estatuto: event.target.value });
    }

    handleChangeRegimento(event) {
        this.setState({ regimento: event.target.value });
    }

    handleChangeCartaPrincipios(event) {
        this.setState({ cartaPrincipios: event.target.value });
    }

    handleChangeCartaMagma(event) {
        this.setState({ cartaMagma: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        //update estatuto
        await this.changeLink("EstatutoSocial", this.state.estatuto);
        //update regimento
        await this.changeLink("RegimentoInterno", this.state.regimento);
        //update principios
        await this.changeLink("CartaDePrincipios", this.state.cartaPrincipios);
        //update magma
        await this.changeLink("CartaMagna", this.state.cartaMagma);
        //refresh
        this.props.history.go(0);
        //stop loading animation
        this.setState({ loading: false });        
    }

    changeLink = async (name, link) => {
        var res = await this.FetchService.changeNorms(name, link);
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
        }
    } 

    render() {
        return (
            <div className="Norms">
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
                                <div className="ContentsRow">
                                    <div className="ContentsRowItem">
                                        <h1 className="Tittle">Estatuto social</h1>
                                        <textarea className="TextField" value={this.state.estatuto} onChange={this.handleChangeEstatuto} />
                                    </div>
                                    <div className="ContentsRowItem">
                                        <h1 className="Tittle">Regimento interno</h1>
                                        <textarea className="TextField" value={this.state.regimento} onChange={this.handleChangeRegimento} />
                                    </div>
                                </div>
                                <div className="ContentsRow">
                                    <div className="ContentsRowItem">
                                        <h1 className="Tittle">Carta de princípios</h1>
                                        <textarea className="TextField" value={this.state.cartaPrincipios} onChange={this.handleChangeCartaPrincipios} />
                                    </div>
                                    <div className="ContentsRowItem">
                                        <h1 className="Tittle">Carta magma da Umbanda</h1>
                                        <textarea className="TextField" value={this.state.cartaMagma} onChange={this.handleChangeCartaMagma} />
                                    </div>
                                </div>

                                <div className="ContentsRow">
                                    <button className="Button" onClick={this.handleSubmit}>Salvar</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}