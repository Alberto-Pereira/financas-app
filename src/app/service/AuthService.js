import LocalStorageService from './localstorageService'

export const USUARIO_LOGADO = '_usuario_logado'

class AuthService{

    static isUsuarioAutenticado(){
        const usuario =  LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }
}

export default AuthService