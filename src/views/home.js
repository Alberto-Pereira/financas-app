import React from "react";

import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";

class Home extends React.Component{

    state = {
        saldo : 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
             .then(response => {
                 this.setState({saldo: response.data})
             }).catch(error => {
                 console.error(error.response)
             })
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron" style={{backgroundColor: "#e9ecef", padding: '2rem 1rem', marginBottom: '1rem', borderRadius: '.3rem'}}>
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo} </p>
                    <hr className="my-4"/>
                    <p>Essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg"
                           href="#/cadastro-usuarios"
                           role="button">
                               <i className="fa fa-users"></i>Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg"
                           href="#/cadastro-lancamento"
                           role="button">
                               <i className="fa fa-users"></i>Cadastrar Lançamento
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}

export default Home