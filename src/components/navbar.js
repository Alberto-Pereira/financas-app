import React from "react";
import AuthService from "../app/service/AuthService";

import NavbarItem from "./navbarItem";

const deslogar = () => {
    AuthService.removerUsuarioAutenticado()
}

function Navbar(){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button"
                        data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={AuthService.isUsuarioAutenticado()} href="#/home" label="Home"/>
                        <NavbarItem render={AuthService.isUsuarioAutenticado()} href="#/cadastro-usuarios" label="Usuários"/>
                        <NavbarItem render={AuthService.isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lançamentos"/>
                        <NavbarItem render={AuthService.isUsuarioAutenticado()} href="#/login" label="Sair" onClick={deslogar}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar