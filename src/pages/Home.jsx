import React from 'react'
import './layouts/Home.css'
import logoImage from '../assets/logo.jpg'
import Loading from "../components/Loading"
import FetchService from '../services/FetchService'
import ResponseHandler from '../services/ResponseHandler'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, login: "", password: "" };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async () => {
    this.setState({ loading: true });
    var res = await this.FetchService.login(this.state.login, this.state.password);
    if (res === false) {
      alert("Login ou senha incorretos");
    } else if (res === null) {
      await this.ResponseHandler.nullResponse();
    } else {
      await this.ResponseHandler.loginResponse(this.state.login, res.token);
      //let data = sessionStorage.getItem('key');
      //sessionStorage.clear();
      this.props.history.push("/Users");
    }
    this.setState({ loading: false });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <div className="App">
          <Loading />
        </div>
      )
    } else {
      return (
        <div className="Home">
          <div className="Logo">
            <img src={logoImage} alt="Logo" className="LogoImage" />
            <h1 className="LogoTittle">Casa Joaquim</h1>
          </div>
          <div className="Fields">
            <div className="FieldsBackgournd">
              <h1 className="FieldsTittle">Sistema Administrativo</h1>
              <input className="TextFields" value={this.state.login} onChange={this.handleLoginChange} placeholder={"Login"} onKeyDown={this.handleKeyDown} />
              <input type="password" className="TextFields" value={this.state.password} onChange={this.handlePasswordChange} placeholder={"Senha"} onKeyDown={this.handleKeyDown} />
              <button className="Button" onClick={this.handleSubmit}>
                Acessar
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}