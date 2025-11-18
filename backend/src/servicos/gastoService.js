import { gastos, balanco } from "../database.js";

export function registrarGasto(novoLancamento) {
    gastos.push(novoLancamento);
    
    // Verifica se é RECEITA ou DESPESA para atualizar o balanço
    if (novoLancamento.tipo === 'receita') {
        balanco.receitas += novoLancamento.valor;
    } else {
        // Assume que é despesa
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