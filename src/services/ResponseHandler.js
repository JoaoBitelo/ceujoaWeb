export default class ResponseHandler {

    loginResponse = async(login, token) => {
        sessionStorage.setItem('login', login);
        sessionStorage.setItem('token', token);

    }

    nullResponse = async() => {
        alert("Não foi possível se conectar ao banco de dados");
    }

    trueResponse = async(token) => {
        sessionStorage.setItem('token', token);
    }
}