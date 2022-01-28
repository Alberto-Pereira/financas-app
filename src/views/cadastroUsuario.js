import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import toastr, { mensagemErro, mensagemSucesso } from "../components/toastr-cp"

class CadastroUsuario extends React.Component{
    
    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }
    
    constructor(){
        super()
        this.service = new UsuarioService()
    }

    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatório.')
        }else if(!this.state.nome.match(/^([A-Z]{1}[a-z]+\s?)+$/)){
            msgs.push('Informe um nome válido.')
        }

        if(!this.state.email){
            msgs.push('O campo Email é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9._]+[@]{1}[a-z0-9]+[.]{1}[a-z]+$/)){
            msgs.push('Informe um email válido.')
        }

        if(!this.state.senha){
            msgs.push('O campo Senha é obrigatório.')
        }else if(!this.state.senha.match(/^[.\s\S\d\D\w\W]{3,}$/)){
            msgs.push('As senhas precisam conter ao menos 3 caracteres.')
        }

        if(!this.state.senhaRepeticao){
            msgs.push('O campo Repita a Senha é obrigatório.')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não coincidem.')
        }

        return msgs
    }

    cadastrar = () => {
        const msgs = this.validar()

        if(msgs && msgs.length > 0){
            msgs.forEach((msg) => {
                mensagemErro(msg)
            })
            return false
        }


        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service
                .salvar(usuario)
                .then(response => {
                    mensagemSucesso('Sucesso', 'Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                    this.props.history.push("/login")
                })
                .catch(error => {
                    mensagemErro('Erro', error.response.data)
                })
    }

    cancelar = () => {
        this.props.history.push("/login")
    }

    render(){
        return(
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" 
                                           id="inputNome" 
                                           className="form-control" 
                                           name="nome" 
                                           onChange={e => this.setState({nome: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email" 
                                           id="inputEmail" 
                                           className="form-control" 
                                           name="email" 
                                           onChange={e => this.setState({email: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" 
                                           id="inputSenha" 
                                           className="form-control" 
                                           name="senha" 
                                           onChange={e => this.setState({senha: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password" 
                                           id="inputRepitaSenha" 
                                           className="form-control" 
                                           name="senha" 
                                           onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                </FormGroup>
                                <button className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
                                <button className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)