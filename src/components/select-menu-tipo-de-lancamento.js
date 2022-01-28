import React from "react";

function SelectMenuTipoDeLancamento(props){
    
    const lista = [
        {label: 'SELECIONE...', value: ''},
        {label: 'Receita', value: 'RECEITA'},
        {label: 'Despesa', value: 'DESPESA'},
    ]
    
    const options = lista.map((option, index) => {
        return(
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return(
        <select className="form-select" {...props}>
            {options}
        </select>
    )
}

export default SelectMenuTipoDeLancamento