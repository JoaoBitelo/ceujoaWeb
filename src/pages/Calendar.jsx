import React from 'react'
import './layouts/Calendar.css'
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from "../components/Loading"
import AddCalendar from '../components/AddCalendar'
import EditCalendar from '../components/EditCalendar'
import DeleteCalendar from '../components/DeleteCalendar'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, searchText: "", calendar: [] };
        this.searchText = this.searchText.bind(this);
        this.searchButton = this.searchButton.bind(this);
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        await this.getCalendarFromAPI();
        this.setState({ loading: false });
    }

    getCalendarFromAPI = async () => {
        var res = await this.FetchService.getCalendar();
        if (res === false) {
            alert("Login ou senha incorretos");
        } else if (res === null) {
            await this.ResponseHandler.nullResponse();
        } else {
            this.setState({ calendar: res.eventos });
            await this.ResponseHandler.trueResponse(res.token);
        }
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchButton = async () => {
        this.setState({ loading: true });
        await this.getCalendarFromAPI();
        if (this.state.searchText.length > 0) {
            var filteredEvents = [];
            this.state.calendar.forEach(element => {
                if (element.atividade.toUpperCase().includes(this.state.searchText.toUpperCase())) {
                    filteredEvents.push(element);
                } else if(element.dataProvavel.toUpperCase().includes(this.state.searchText.toUpperCase())){
                    filteredEvents.push(element);
                }
            });
            this.setState({ calendar: filteredEvents })
        }
        this.setState({ loading: false });
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.searchButton();
        }
    }

    render() {
        return (
            <div className="Calendar">
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
                                <div className="ButtonsContent">
                                    <div className="ButtonsContentRow">
                                        <h1 className="UsersText">Calendário</h1>
                                        <AddCalendar history={this.props.history} />
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <h1 className="UsersText">Manutenção</h1>
                                        <DeleteCalendar history={this.props.history} />
                                    </div>
                                    <div className="ButtonsContentRow">
                                        <input className="AddButtonTextfield" placeholder={"NOME ou DATA do evento"} value={this.state.searchText} onChange={this.searchText} onKeyDown={this.handleKeyDown} />
                                        <button className="AddButton" onClick={this.searchButton}>Pesquisar</button>
                                    </div>
                                </div>
                                <div className="ListContent">
                                    <div className="ListContentTable">
                                        <div className="ListContentTableIndividualRowTittle">
                                            <h2 className="ListContentTableIndividualRowTextTittle">Nome</h2>
                                            <h2 className="ListContentTableIndividualRowTextLastOneTittle">Data</h2>
                                        </div>
                                        {
                                            this.state.calendar.map((event, index) => {
                                                return (
                                                    <EditCalendar key={event._id.$oid} history={this.props.history} event={event} index={index} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}