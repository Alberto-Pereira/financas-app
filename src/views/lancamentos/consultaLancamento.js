import React from "react";
import {withRouter} from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenuMeses from "../../components/select-menu-meses-do-ano";
import SelectMenuTipoDeLancamento from "../../components/select-menu-tipo-de-lancamento";
import LancamentoTable from "./lancamentos-table";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService"
import * as msg from "../../components/toastr-cp"
import {Dialog} from "primereact/dialog"
import {Button} from "primereact/button"

class ConsultaLancamento extends React.Component{

    state = {
        ano:'',
        mes:'',
        tipo:'',
        descricao:'',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos:[]
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    

    buscar = () => {
        if(!this.state.ano){
            msg.mensagemErro('Erro', 'O campo Ano é obrigatório.')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
                .consultar(lancamentoFiltro)
                .then(resposta => {
                    this.setState({lancamentos: resposta.data})
                })
                .catch(error => {
                    msg.mensagemErro('Erro', error.response.data)
                })
    }

    cadastrarLancamento = () => {
        this.props.history.push('/cadastro-lancamento')
    }

    editar=(id)=>{
        this.props.history.push(`/cadastro-lancamento/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog : true, lancamentoDeletar: lancamento  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, lancamentoDeletar: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1);
                this.setState( { lancamentos: lancamentos, showConfirmDialog: false } )
                msg.mensagemSucesso('Lançamento deletado com sucesso!')
            })
            .catch(error => {
                msg.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
            })
    }

    alterarStatus = (lancamento, status) => {
        this.service
                .alterarStatus(lancamento.id, status)
                .then(response => {
                    const lancamentos = this.state.lancamentos
                    const index = lancamentos.indexOf(lancamento)
                    if(index !== -1){
                        lancamento['status'] = status
                        lancamentos[index] = lancamento
                        this.setState({lancamento})
                    }
                    msg.mensagemSucesso("Sucesso", "Status atualizado com sucesso!")
                })
    }

    render(){
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        )

        return(
            <div className="container">
                <Card title="Consultar Lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup label="Ano: *" htmlFor="inputAno">
                                    <input type="text" 
                                           className="form-control" 
                                           id="inputAno" 
                                           value={this.state.ano}
                                           onChange={e => this.setState({ano: e.target.value})}
                                           placeholder="Digite o ano"/>
                                </FormGroup>
                                <FormGroup label="Mês: " htmlFor="inputMes">
                                    <SelectMenuMeses id="inputMes" 
                                                     value={this.state.mes}
                                                     onChange={e => this.setState({mes: e.target.value})}/>
                                </FormGroup>
                                <FormGroup label="Descrição: " htmlFor="inputDesc">
                                    <input type="text" 
                                           className="form-control" 
                                           id="inputDesc" 
                                           value={this.state.descricao}
                                           onChange={e => this.setState({descricao: e.target.value})}
                                           placeholder="Digite a descrição"/>
                                </FormGroup>
                                <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipo">
                                    <SelectMenuTipoDeLancamento id="inputTipo"
                                                                value={this.state.tipo}
                                                                onChange={e => this.setState({tipo: e.target.value})}/>
                                </FormGroup>
                                <br/>
                                <button type="button" className="btn btn-success" onClick={this.buscar}>Buscar</button>
                                <button type="button" className="btn btn-danger" onClick={this.cadastrarLancamento}>Cadastrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <LancamentoTable lancamentos={this.state.lancamentos} editAction={this.editar} deleteAction={this.abrirConfirmacao}
                                             alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </Card>
                <div>
                    <Dialog header="Excluir Lançamento" 
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }} 
                            modal={true}
                            draggable={false}
                            footer={confirmDialogFooter} 
                            onHide={() => this.setState({showConfirmDialog:false})}>
                        <p>Confirmar a exclusão do Lançamento?</p>
                    </Dialog>
                </div>
            </div>
            
        )
    }

}

export default withRouter(ConsultaLancamento)