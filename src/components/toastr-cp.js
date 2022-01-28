import toastr from "toastr";

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export function mensagemSucesso(titulo, mensagem){
    toastr["success"](mensagem, titulo)
}

export function mensagemErro(titulo, mensagem){
    toastr["error"](mensagem, titulo)
}

export function mensagemAlerta(titulo, mensagem){
    toastr["warning"](mensagem, titulo)
}