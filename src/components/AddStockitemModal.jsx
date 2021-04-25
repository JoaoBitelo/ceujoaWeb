import React from 'react'
import './layouts/AddStockitemModal.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class AddStockitemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", have: "", need: "" };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHaveChange = this.handleHaveChange.bind(this);
        this.handleNeedChange = this.handleNeedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleHaveChange(event) {
        this.setState({ have: event.target.value });
    }

    handleNeedChange(event) {
        this.setState({ need: event.target.value })
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.addStock(this.state.name, this.state.need, this.state.have);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);;
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Popup
                trigger={<button className="button"> Adicionar </button>}
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
                                <button className="close" onClick={close}>&times;</button>
                                <div className="header"> Criar novo material litúrgico </div>
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
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="button" onClick={this.handleSubmit}>Salvar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}