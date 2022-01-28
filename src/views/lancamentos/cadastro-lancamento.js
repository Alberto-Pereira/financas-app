import React from "react";

import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenuMeses from "../../components/select-menu-meses-do-ano";
import SelectMenuTipoDeLancamento from "../../components/select-menu-tipo-de-lancamento";
import * as msg from "../../components/toastr-cp"
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

class CadastroLancamento extends React.Component{

    state = {
        id:'',
        descricao:'',
        mes:'',
        ano:'',
        valor:'',
        tipo:'',
        status:'',
        usuario:'',
        atualizando:false
    }

    componentDidMount(){
        const params = this.props.match.params
        
        if(params.id){
            this.service
                    .obterPorId(params.id)
                    .then(response => {
                        this.setState({...response.data, atualizando:true})
                    })
                    .catch(error => {
                        msg.mensagemErro("Erro", error.response.data)
                    })
        }
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    salvar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, mes, ano, valor, tipo } = this.state
        const lancamento = { descricao, mes, ano, valor, tipo, usuario: usuarioLogado.id }

        this.service
                .salvar(lancamento)
                .then(response => {
                    this.props.history.push('/consulta-lancamentos')
                    msg.mensagemSucesso("Sucesso", "Lançamento cadastrado com sucesso!")
                })
                .catch(error => {
                    msg.mensagemErro("Erro", error.response.data)
                })
    }

    atualizar = () => {
        const { descricao, mes, ano, valor, tipo, status, usuario, id } = this.state
        const lancamento = { descricao, mes, ano, valor, tipo, usuario, status, id }

        this.service
                .atualizar(lancamento)
                .then(response => {
                    this.props.history.push('/consulta-lancamentos')
                    msg.mensagemSucesso("Sucesso", "Lançamento atualizado com sucesso!")
                })
                .catch(error => {
                    msg.mensagemErro("Erro", error.response.data)
                })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                            <FormGroup label="Descrição: *" htmlFor="inputDesc">
                                <input type="text" className="form-control" id="inputDesc" value={this.state.descricao}
                                       onChange={e => this.setState({descricao: e.target.value})} placeholder="Digite a descrição"/>
                            </FormGroup>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup label="Mês: *" htmlFor="inputMes">
                                        <SelectMenuMeses className="form-select" id="inputMes" value={this.state.mes}
                                                         onChange={e => this.setState({mes: e.target.value})}></SelectMenuMeses>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup label="Ano: *" htmlFor="inputAno">
                                        <input type="number" className="form-control" id="inputAno" value={this.state.ano}
                                               onChange={e => this.setState({ano: e.target.value})} placeholder="Digite o ano"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <FormGroup label="Valor: *" htmlFor="inputValor">
                                        <input type="number" className="form-control" id="inputValor" value={this.state.valor}
                                               onChange={e => this.setState({valor: e.target.value})} placeholder="R$ 0,00"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup label="Tipo: *" htmlFor="inputTipo">
                                        <SelectMenuTipoDeLancamento className="form-select" id="inputTipo" value={this.state.tipo}
                                                                    onChange={e => this.setState({tipo: e.target.value})}/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup label="Status" htmlFor="inputStatus">
                                        <input type="text" className="form-control" id="inputStatus" value={this.state.status}
                                               onChange={e => this.setState({status: e.target.value})} disabled/>
                                    </FormGroup>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-4">
                                    {this.state.atualizando ? (<button className="btn btn-primary" onClick={this.atualizar}>Atualizar</button>) 
                                    : (<button className="btn btn-success" onClick={this.salvar}>Salvar</button>) }
                                    <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-lancamentos')}>Cancelar</button>
                                </div>
                            </div>                           
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(CadastroLancamento)