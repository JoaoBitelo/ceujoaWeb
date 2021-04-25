import React from 'react'
import './layouts/EditFinancials.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';
import AddFinancialMonthly from './AddFinancialMonthly';
import EditFinancialMonthly from './EditFinancialMonthly'

export default class EditFinancials extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: this.props.user.nome, data: false };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleClick = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getFinancials(this.props.user.login);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            this.setState({ data: res });
        }
        this.setState({ loading: false });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.getFinancials(this.props.user.login);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Popup
                trigger=
                {
                    <li className="ListContentTableIndividualRow" key={this.props.user._id.$oid} style={{ backgroundColor: this.props.index % 2 === 0 ? "#9CF1B0" : "#82ce94" }}>
                        <h2 className="ListContentTableIndividualRowText">{this.props.user.nome}</h2>
                        <h2 className="ListContentTableIndividualRowText">{this.props.user.tipo}</h2>
                        <h2 className="ListContentTableIndividualRowTextLastOne">{this.props.user.grau}</h2>
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
                                <div className="header"> {this.state.name} </div>
                                {
                                        this.state.data === false
                                        ?
                                        <div className="content">
                                            <div className="line">
                                                <button className="buttonSearch" onClick={this.handleClick}>Obter lista completa</button>
                                            </div>
                                        </div>
                                        
                                        :
                                        <div className="content">
                                            <h1 className="TextFieldsTittle">Mensalidades</h1>
                                            {
                                                this.state.data.mensalidades.map((MP, index) => {
                                                    return (
                                                        <EditFinancialMonthly key={MP._id.$oid} history={this.props.history} MP={MP}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                
                                <div className="actions">
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <AddFinancialMonthly key={this.props.user._id.$oid} history={this.props.history} user={this.props.user} />
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}