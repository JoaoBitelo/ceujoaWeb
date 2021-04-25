import React from 'react'
import './layouts/Sidebar.css'
import logoImage from '../assets/logo.jpg'
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpenFinanceira: false };
      }

    handleClick(toPage) {
        const nameOfPage = "/" + toPage
        this.props.history.push(nameOfPage);
    }

    handleOpeningFinanceira() {
        if(this.state.isOpenFinanceira){
            this.setState({ isOpenFinanceira: false })
        } else {
            this.setState({ isOpenFinanceira: true })
        }
    }

    render() {
        return (
            <div className="SideBar">
                <img src={logoImage} alt="Logo" className="SideBarImage" />
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Users")}>Usuários</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("CommomArea")}>Frase tela de início</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Etiquette")}>Regras de etiqueta</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Calendar")}>Calendário</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Degree")}>Área de ensino</button>
                </div>
                {
                    this.state.isOpenFinanceira===false
                    ?
                        <div className="rowItens">
                            <FaAngleRight className="Icons" />
                            <button className="SidebarButton" onClick={() => this.handleOpeningFinanceira()}>Área Financeira</button>
                        </div>
                    :
                        <div className="rowItensWithSubItens">
                            <div className="rowItensNoBorder">
                                <FaAngleDown className="Icons" />
                                <button className="SidebarButton" onClick={() => this.handleOpeningFinanceira()}>Área Financeira</button>
                            </div>
                            <div>
                                <div className="rowItensNoBorder">
                                    <FaAngleRight className="Icons" />
                                    <button className="SidebarButton" onClick={() => this.handleClick("Financials")}>Mensalidades</button>
                                </div>
                                <div className="rowItensNoBorder">
                                    <FaAngleRight className="Icons" />
                                    <button className="SidebarButton" onClick={() => this.handleClick("Contributions")}>Contribuições</button>
                                </div>
                            </div>
                </div>
                }
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Donations")}>Ações sociais</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Stock")}>Material Litúrgico</button>
                </div>
                <div className="rowItens">
                    <FaAngleRight className="Icons" />
                    <button className="SidebarButton" onClick={() => this.handleClick("Norms")}>Estatuto social e Regimento interno</button>
                </div>
            </div>
        );
    }
}