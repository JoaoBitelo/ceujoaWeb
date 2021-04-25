import React from 'react'
import './layouts/EditFinancialMonthly.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class EditFinancialMonthly extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, MP: this.props.MP };
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleStatusChange(index, event) {
        var newMP = this.state.MP
        newMP.meses[index].status = event.target.value
        this.setState({ MP: newMP });
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        var res = await this.FetchService.editMonthly(this.state.MP._id.$oid, this.state.MP.meses);
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
        var res = await this.FetchService.deleteMonthly(this.state.MP._id.$oid);
        if (res === false) {
            alert("Ocorreu um erro ao adicionar. Verifique se as informações foram devidamente preenchidas e se as regras estabelecidades foram respeitadas, como por exemplo o login ser único");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            await this.ResponseHandler.trueResponse(res);
            alert("Mensalidade removida com sucesso");
            this.props.history.go(0);
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <Popup
                trigger=
                {
                    <button className="buttonUpdate" style={{ alignSelf: 'center' }}>{this.state.MP.ano}</button>
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
                            <div className="financialModal">
                                <div className="header"> Mensalidades de {this.state.MP.ano} </div>
                                <div className="content">
                                    {
                                        this.state.MP.meses.map((month, index) => {
                                            return (
                                                <div className="line">
                                                    <h1 className="TextFields">{month.nome}</h1>
                                                    <select className="TextFieldsInputsAAA" value={month.status} onChange={(e) => this.handleStatusChange(index, e)}>
                                                        <option value="PENDENTE">PENDENTE</option>
                                                        <option value="PAGO">PAGO</option>
                                                        <option value="ISENTO">ISENTO</option>
                                                    </select>
                                                </div>
                                            )
                                        })
                                    }  
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