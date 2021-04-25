import React from 'react'
import './layouts/EditDegrees.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';
import EditDegreeContent from './EditDegreeContent'
import AddDegreeContent from './AddDegreeContent'


export default class EditDegrees extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: this.props.degree.nome, degree: this.props.degree.grauMinimo, order: this.props.degree.ordenacao, degreeContent: false };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDegreeChange(event) {
        this.setState({ degree: event.target.value.replace(/\D/, '') })
    }

    handleOrderChange(event) {
        this.setState({ order: event.target.value.replace(/\D/, '') })
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.editDegree(this.props.degree.id.$oid, this.state.name, this.state.degree, this.state.order);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }

    handleDelete = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.deleteDegree(this.props.degree.id.$oid);
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

    handleLoad = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getDegreeContent(this.props.degree.id.$oid);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            var contentWithSpecifics = []
            for (let i = 0; i < res.conteudoDoGrau.length; i++) {
                var secondRes = await this.getSpecifics(res.conteudoDoGrau[i].id.$oid)
                contentWithSpecifics.push(secondRes)
            }
            this.setState({ degreeContent: contentWithSpecifics });
        }
        this.setState({ loading: false });
    }

    getSpecifics = async (id) => {
        var res = await this.FetchService.getDegreeContentSpecific(id);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            res = res.conteudo;
            var adt = "";
            for (let i = 0; i < res.adicional.length; i++) {
                if (i === 0) {
                    adt = res.adicional[i].titulo + ";" + res.adicional[i].link
                } else {
                    adt = adt + ";" + res.adicional[i].titulo + ";" + res.adicional[i].link
                }
            }
            res.adicional = adt
            console.log(res)
            return res
        }
    }

    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRow" key={this.props.degree.id.$oid} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowText">{this.props.degree.nome}</h2>
                        <h2 className="ListContentTableIndividualRowText">{this.props.degree.grauMinimo}</h2>
                        <h2 className="ListContentTableIndividualRowTextLastOne">{this.props.degree.ordenacao}</h2>
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
                            <div className="EditDegrees">
                                <div className="header"> Editar Grau </div>
                                <div className="content">

                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome do usuário"} value={this.state.name} onChange={this.handleNameChange} />
                                        <h1 className="TextFields">Grau</h1>
                                        <input className="TextFieldsInputs" placeholder={"Apenas números"} value={this.state.degree} onChange={this.handleDegreeChange} />
                                        <h1 className="TextFields">Ordenação</h1>
                                        <input className="TextFieldsInputs" placeholder={"Um número"} value={this.state.order} onChange={this.handleOrderChange} />
                                    </div>
                                    {this.state.degreeContent === false
                                        ?
                                        <div className="line">
                                            <button className="buttonUpdate" onClick={this.handleLoad}>Carregar</button>
                                        </div>
                                        :

                                        this.state.degreeContent.map((content, index) => {
                                            return (
                                                <EditDegreeContent key={content.id.$oid} history={this.props.history} content={content} index={index} />
                                            )
                                        })

                                    }
                                </div>
                                <div className="actions">
                                    <button className="buttonDelete" onClick={this.handleDelete}>Deletar</button>
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="buttonUpdate" onClick={this.handleSubmit}>Salvar</button>
                                    <AddDegreeContent history={this.props.history} degree={this.props.degree} />
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}