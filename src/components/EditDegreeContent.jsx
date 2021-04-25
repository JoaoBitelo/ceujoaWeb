import React from 'react'
import './layouts/EditDegreeContent.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class EditDegreeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, id: this.props.content.id.$oid, name: this.props.content.nome, description: this.props.content.descricao, additionalContent: this.props.content.adicional };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAdditionalContentChange = this.handleAdditionalContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleAdditionalContentChange(event) {
        this.setState({ additionalContent: event.target.value });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var mont = await this.PrepareAdditionalContent();
        if (mont === false) {
            alert("Há algo errado no conteudo adicional, favor verificar");
        } else {
            var res = await this.FetchService.editDegreeContent(this.state.id, this.state.name, this.state.description, mont);
            if (res === false) {
                alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
            } else if (res === null) {
                await this.ResponseHandler.nullResponse();
            } else {
                await this.ResponseHandler.trueResponse(res);
                this.props.history.go(0);
            }
        }
        this.setState({ loading: false });
    }

    PrepareAdditionalContent = async () => {
        var adt = this.state.additionalContent.split(';')
        var adt2 = [];
        if (this.state.additionalContent.length > 0) {
            if (adt.length % 2 !== 0) {
                return false
            } else {
                for (let i = 0; i < adt.length; i++) {
                    var item = {
                        titulo: adt[i],
                        link: adt[i + 1]
                    }
                    adt2.push(item)
                    i++;
                }
            }
        }
        return adt2;
    }

    handleDelete = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.deleteDegreeContent(this.state.id);
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

    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRow" key={this.props.content.id.$oid} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowTextLastOne">{this.props.content.nome}</h2>
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
                            <div className="EditDegreeContent">
                                <div className="lineMain">
                                    <div className="content">
                                        <div className="line" style={{paddingTop: "50px"}}>
                                            <div className="subline">
                                                <h1 className="TextFields">Título:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "7vh", marginLeft: "10px", marginRight: "10px" }} placeholder={"Titulo do conteudo. Esse valor sera mostrado tambem como nome"} value={this.state.name} onChange={this.handleNameChange} />
                                            </div>
                                        </div>
                                        <div className="line">
                                            <div className="subline">
                                                <h1 className="TextFields">Descrição:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "25vh", marginLeft: "10px", marginRight: "10px" }} placeholder={"Descrição do material de ensino"} value={this.state.description} onChange={this.handleDescriptionChange} />
                                            </div>
                                        </div>
                                        <div className="line">
                                            <div className="subline">
                                                <h1 className="TextFields">Fontes adicionais:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "10vh", marginLeft: "10px", marginRight: "10px" }} placeholder={"Para este deve ser: TITULO;LINK;TITULO;LINK"} value={this.state.additionalContent} onChange={this.handleAdditionalContentChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button className="buttonUpdate" onClick={this.handleSubmit}>Salvar</button>
                                        <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                        <button className="buttonDelete" onClick={this.handleDelete}>Deletar</button>
                                    </div>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}