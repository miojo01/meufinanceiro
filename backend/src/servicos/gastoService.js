import { gastos, balanco } from "../database.js";

// Por trás do Facade, existem serviços que realizam o trabalho pesado. O Facade importa-os e orquestra-os

// GastoService lida com a lógica de adicionar ao array e atualizar o objeto balanco (receitas vs despesas).

// Aqui mantemos os gastos em memória
export function registrarGasto(novoLancamento) {
    gastos.push(novoLancamento);
    
    // Verifica se é RECEITA ou DESPESA para atualizar o balanço
    if (novoLancamento.tipo === 'receita') {
        balanco.receitas += novoLancamento.valor;
    } else {
        balanco.despesas += novoLancamento.valor;
    }
    
    // Recalcula o total
    balanco.total = balanco.receitas - balanco.despesas;
    
    console.log("Lançamento registrado:", novoLancamento);
    return novoLancamento;
}

export function listarTodosGastos() {
    return gastos;
}