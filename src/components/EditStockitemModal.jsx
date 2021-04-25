import React from 'react'
import './layouts/EditStockitemModal.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class EditStockitemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: this.props.item.nome, need: this.props.item.necessidade, have: this.props.item.estoque };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNeedChange = this.handleNeedChange.bind(this);
        this.handleHaveChange = this.handleHaveChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleNeedChange(event) {
        this.setState({ need: event.target.value });
    }

    handleHaveChange(event) {
        this.setState({ have: event.target.value })
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.editStock(this.props.item._id.$oid, this.state.name, this.state.need, this.state.have);
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
        var res = await this.FetchService.deleteStock(this.props.item._id.$oid);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            alert("Material removido com sucesso");
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRow" key={this.props.item._id.$oid} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowText">{this.props.item.nome}</h2>
                        <h2 className="ListContentTableIndividualRowText">{this.props.item.necessidade}</h2>
                        <h2 className="ListContentTableIndividualRowTextLastOne">{this.props.item.estoque}</h2>
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
                            <div className="modal">
                                <div className="header"> Editar material litúrgico </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Nome</h1>
                                        <input className="TextFieldsInputs" placeholder={"Nome do item"} value={this.state.name} onChange={this.handleNameChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Necessário</h1>
                                        <input className="TextFieldsInputs" placeholder={"Quantidade necessária"} value={this.state.need} onChange={this.handleNeedChange} />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Estoque</h1>
                                        <input className="TextFieldsInputs" placeholder={"Quantidade em estoque"} value={this.state.have} onChange={this.handleHaveChange} />
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="buttonDelete" onClick={this.handleDelete}>Deletar</button>
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="buttonUpdate" onClick={this.handleSubmit}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}