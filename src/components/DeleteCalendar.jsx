import React from 'react'
import './layouts/DeleteCalendar.css'
import Popup from 'reactjs-popup';
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Loading from './Loading';


export default class DeleteCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, dataBeginDay: "", dataBeginMonth: "", dataBeginYear: "", dataEndDay: "", dataEndMonth: "", dataEndYear: "" };
        this.handleBeginDAYChange = this.handleBeginDAYChange.bind(this);
        this.handleBeginMONTHChange = this.handleBeginMONTHChange.bind(this);
        this.handleBeginYEARChange = this.handleBeginYEARChange.bind(this);
        this.handleEndDAYChange = this.handleEndDAYChange.bind(this);
        this.handleEndMONTHChange = this.handleEndMONTHChange.bind(this);
        this.handleEndYEARChange = this.handleEndYEARChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    handleBeginDAYChange(event) {
        this.setState({ dataBeginDay: event.target.value.replace(/\D/, '') })
    }

    handleBeginMONTHChange(event) {
        this.setState({ dataBeginMonth: event.target.value.replace(/\D/, '') })
    }

    handleBeginYEARChange(event) {
        this.setState({ dataBeginYear: event.target.value.replace(/\D/, '') })
    }

    handleEndDAYChange(event) {
        this.setState({ dataEndDay: event.target.value.replace(/\D/, '') })
    }

    handleEndMONTHChange(event) {
        this.setState({ dataEndMonth: event.target.value.replace(/\D/, '') })
    }

    handleEndYEARChange(event) {
        this.setState({ dataEndYear: event.target.value.replace(/\D/, '') })
    }


    handleSubmit = async () => {
        this.setState({ loading: true });
        var dateBegin = this.state.dataBeginDay + "/" + this.state.dataBeginMonth + "/" + this.state.dataBeginYear;
        var dateEnd = this.state.dataEndDay + "/" + this.state.dataEndMonth + "/" + this.state.dataEndYear;
        var res = await this.FetchService.DeleteCalendarDetailsWithPeriod(dateBegin, dateEnd);
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
                trigger={<button className="buttonDelete"> Excluir </button>}
                modal
                nested
            >
                {
                    this.state.loading === true
                        ?
                        <Loading />
                        :
                        close => (
                            <div className="DeleteCalendar">
                                <button className="close" onClick={close}>&times;</button>
                                <div className="header"> Deleção de multiplos eventos </div>
                                <div className="content">
                                    <div className="line">
                                        <h1 className="TextFields">Data Início</h1>
                                        <input className="TextFieldsInputs" placeholder={"dia"} value={this.state.dataBeginDay} onChange={this.handleBeginDAYChange} maxLength="2" />
                                        <h2 className="TextFields2">-</h2>
                                        <input className="TextFieldsInputs" placeholder={"mês"} value={this.state.dataBeginMonth} onChange={this.handleBeginMONTHChange} maxLength="2" />
                                        <h2 className="TextFields2">-</h2>
                                        <input className="TextFieldsInputs" placeholder={"ano"} value={this.state.dataBeginYear} onChange={this.handleBeginYEARChange} maxLength="2" />
                                    </div>
                                    <div className="line">
                                        <h1 className="TextFields">Data Fim</h1>
                                        <input className="TextFieldsInputs" placeholder={"dia"} value={this.state.dataEndDay} onChange={this.handleEndDAYChange} maxLength="2" />
                                        <h2 className="TextFields2">-</h2>
                                        <input className="TextFieldsInputs" placeholder={"mês"} value={this.state.dataEndMonth} onChange={this.handleEndMONTHChange} maxLength="2" />
                                        <h2 className="TextFields2">-</h2>
                                        <input className="TextFieldsInputs" placeholder={"ano"} value={this.state.dataEndYear} onChange={this.handleEndYEARChange} maxLength="2" />
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="buttonCancel" onClick={() => { close() }}>Cancelar</button>
                                    <button className="buttonDelete" onClick={this.handleSubmit}>Deletar</button>
                                </div>
                            </div>
                        )}
            </Popup>
        )
    }
}