import React from 'react'
import './layouts/CommonAreaPhrase.css'
import logoImage from '../assets/appScreen.jpeg'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"

export default class CommonAreaPhrase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, text: "" };
        this.handleChange = this.handleChange.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getContent("AreaComum");
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ text: res.content.texto.replaceAll('\\n', '\n') });
            await this.ResponseHandler.trueResponse(res.token);
        }
        this.setState({ loading: false });
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.changePhrase(this.state.text);
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
            <div className="Container">
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
                                <img src={logoImage} alt="Logo" className="Image" />
                                <textarea className="TextField" value={this.state.text} onChange={this.handleChange} />
                                <button className="Button" onClick={this.handleSubmit}>Salvar</button>
                            </div>
                    }
                </div>
            </div>
        );
    }
}