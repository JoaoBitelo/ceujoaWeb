const global = require('../util/Urls');
const BASE_URL = global.BASE_URL;

export default class FetchService {

    getT = async() => {
        return sessionStorage.getItem('token')
    }

    getL = async() => {
        return sessionStorage.getItem('login')
    }

    login = async(login, password) => {
        let url = BASE_URL + global.LOGIN
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    senha: password
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getAllUsers = async() => {
        var login = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_ALL_USERS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    token: token
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addUser = async(myLogin, token, name, login, birthday, type, degree) => {
        let url = BASE_URL + global.ADD_USER
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meuLogin: myLogin,
                    token: token,
                    loginDoUsuario: login,
                    nomeDoUsuario: name,
                    aniversario: birthday,
                    tipo: type,
                    grau: degree
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editUser = async(myLogin, token, name, login, birthday, type, degree, id) => {
        let url = BASE_URL + global.EDIT_USER
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meuLogin: myLogin,
                    token: token,
                    loginDoUsuario: login,
                    nomeDoUsuario: name,
                    aniversario: birthday,
                    tipo: type,
                    grau: degree,
                    id: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editUserPassword = async(login) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_USER_PASSWORD
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meuLogin: myLogin,
                    token: token,
                    loginDoUsuario: login,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteUser = async(login) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_USER
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meuLogin: myLogin,
                    token: token,
                    loginDoUsuario: login,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getContent = async(text) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_CONTENT
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: text
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    changePhrase = async(text) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.CHANGE_PHRASE
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    texto: text
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    changeDonation = async(tittle, text) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.CHANGE_DONATION
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: 'Doacoes',
                    titulo: tittle,
                    texto: text
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    changeEtiquette = async(tittle, text) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.CHANGE_ETIQUETTE
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: 'RegrasDeEtiqueta',
                    titulo: tittle,
                    texto: text
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    changeNorms = async(name, link) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.CHANGE_NORMS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: name,
                    link: link,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getStock = async() => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_STOCK
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addStock = async(name, need, have) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_STOCK
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: name,
                    necessidade: need,
                    estoque: have
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editStock = async(id, name, need, have) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_STOCK
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoItem: id,
                    nome: name,
                    necessidade: need,
                    estoque: have
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteStock = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_STOCK
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoItem: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getFinancials = async(userLogin) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_FINANCIALS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    loginParaProcurarMensalidadesContribuicoes: userLogin
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addMonthly = async(userLogin, year) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_MONTHLY
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    loginParaCriarMensalidades: userLogin,
                    anoDasMensalidades: year
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editMonthly = async(id, content) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_MONTHLY
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDasMensalidades: id,
                    content: content
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteMonthly = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_MONTHLY
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDasMensalidades: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getContribution = async() => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_CONTRIBUTIONS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addContribution = async(userLogin, name) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_CONTRIBUTION
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    loginParaCriarContribuicao: userLogin,
                    nomeDaContribuicao: name
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteContribution = async(content) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_CONTRIBUTION
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    content: content
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editContribution = async(content) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_CONTRIBUTION
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    content: content
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getAllDegrees = async() => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_ALL_DEGREES
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addDegree = async(name, degree, order) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_DEGREE
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: name,
                    grauMinimoParaAcesso: degree,
                    ordenacao: order
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editDegree = async(id, name, degree, order) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_DEGREE
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    id: id,
                    nome: name,
                    grauMinimoParaAcesso: degree,
                    ordenacao: order
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteDegree = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_DEGREE
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoGrauASerRemovido: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getDegreeContent = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_DEGREE_CONTENT
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoGrau: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addDegreeContent = async(id, name, description, additional) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_DEGREE_CONTENT
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: name,
                    idDoGrauQuePertence: id,
                    textoDeDescricao: description,
                    conteudoAdicional: additional
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editDegreeContent = async(id, name, description, additionalContent) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_DEGREE_CONTENT
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    nome: name,
                    idDoItemASerEditado: id,
                    textoDeDescricao: description,
                    conteudoAdicional: additionalContent
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteDegreeContent = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_DEGREE_CONTENT
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoGrauASerRemovido: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getDegreeContentSpecific = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_DEGREE_CONTENT_SPECIFICS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoItemQueSeraAlterado: id,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getCalendar = async() => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_CALENDAR
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    getCalendarDetails = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.GET_CALENDAR_DETAILS
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoEvento: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    addCalendarDetails = async(name, type, messages, date, time) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.ADD_CALENDAR
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    tipoDoEvento: type,
                    nomeDoEvento: name,
                    dataDoEvento: date,
                    horaDoEvento: time,
                    recados: messages
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    editCalendarDetails = async(id, name, type, messages, date, time) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.EDIT_CALENDAR
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoEventoASerEditado: id,
                    tipoDoEvento: type,
                    nomeDoEvento: name,
                    dataDoEvento: date,
                    horaDoEvento: time,
                    recados: messages
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    deleteCalendarDetails = async(id) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_CALENDAR
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    idDoEvento: id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }

    DeleteCalendarDetailsWithPeriod = async(dateBegin, dateEnd) => {
        var myLogin = await this.getL();
        var token = await this.getT();
        let url = BASE_URL + global.DELETE_CALENDAR_WITH_FILTER
        return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: myLogin,
                    token: token,
                    dataInicio: dateBegin,
                    dataFinal: dateEnd
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                return null
            });
    }
}