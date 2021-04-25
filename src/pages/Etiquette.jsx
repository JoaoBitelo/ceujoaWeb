import React from 'react'
import './layouts/Etiquette.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"

export default class Etiquette extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, tittle: "", text: "" };
        this.handleChangeTittle = this.handleChangeTittle.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getContent("RegrasDeEtiqueta");
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ tittle: res.content.titulo });
            this.setState({ text: res.content.texto.replaceAll('\\n', '\n') });
            await this.ResponseHandler.trueResponse(res.token);
        }
        this.setState({ loading: false });
    }

    handleChangeTittle(event) {
        this.setState({ tittle: event.target.value });
    }

    handleChangeText(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.changeEtiquette(this.state.tittle, this.state.text);
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div className="Etiquette">
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
                                <div className="ContentsItem">
                                    <textarea className="TextFieldTittle" value={this.state.tittle} onChange={this.handleChangeTittle} />
                                    <textarea className="TextField" value={this.state.text} onChange={this.handleChangeText} />
                                </div>
                                <button className="Button" onClick={this.handleSubmit}>Salvar</button>
                            </div>
                    }
                </div>
            </div>
        );
    }
}