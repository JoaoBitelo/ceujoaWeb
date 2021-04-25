import React from 'react'
import './layouts/AddDegreeContent.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddDegreeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, idC: this.props.degree.id.$oid, name: "", description: "", additionalContent: "" };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAdditionalContentChange = this.handleAdditionalContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            var res = await this.FetchService.addDegreeContent(this.state.idC, this.state.name, this.state.description, mont);
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

    render() {
        return (
            <Popup
                trigger={<button className="buttonUpdate"> Adicionar </button>}
                modal
                nested
            >
                {
                    this.state.loading === true
                        ?
                        <Loading />
                        :
                        close => (
                            <div className="AddDegreeContent">
                                <div className="lineMain">
                                    <div className="content">
                                        <div className="line" style={{ paddingTop: "70px" }}>
                                            <div className="subline">
                                                <h1 className="TextFields">Título:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "4vh" }} placeholder={"Titulo do conteudo. Esse valor sera mostrado tambem como nome"} value={this.state.name} onChange={this.handleNameChange} />
                                            </div>
                                        </div>
                                        <div className="line">
                                            <div className="subline">
                                                <h1 className="TextFields">Descrição:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "24vh" }} placeholder={"Descrição do material de ensino"} value={this.state.description} onChange={this.handleDescriptionChange} />
                                            </div>
                                        </div>
                                        <div className="line">
                                            <div className="subline">
                                                <h1 className="TextFields">Fontes adicionais:</h1>
                                                <textarea className="TextFieldsInputs" style={{ height: "8vh" }} placeholder={"Para este deve ser: TITULO;LINK;TITULO;LINK"} value={this.state.additionalContent} onChange={this.handleAdditionalContentChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button className="buttonUpdate" onClick={this.handleSubmit}>Adicionar</button>
                                        <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}