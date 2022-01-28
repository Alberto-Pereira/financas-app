import React from "react";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home"
import consultaLancamento from "../views/lancamentos/consultaLancamento";
import cadastroLancamento from "../views/lancamentos/cadastro-lancamento";
import AuthService from "../app/service/AuthService";

import { Route, Switch, HashRouter, Redirect} from "react-router-dom"

function RotaAutenticada({component:Component, ...props}){
    return (
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps}/>
                )
            } else {
                return(
                    <Redirect to={{pathname:'/login'}}/>
                )
            }
        }} />
    )
}

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                
                <RotaAutenticada path="/home" component={Home}/>
                <RotaAutenticada path="/consulta-lancamentos" component={consultaLancamento}/>
                <RotaAutenticada path="/cadastro-lancamento/:id?" component={cadastroLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas