// Este é o "contrato" (Component) do padrão Composite.
// Define o que todas as categorias, simples ou compostas, devem ter.
export class ICategoria {
    constructor(nome) {
        if (this.constructor === ICategoria) {
            throw new Error("Classe 'ICategoria' é abstrata e não pode ser instanciada.");
        }
        this.nome = nome;
        this.gastos = []; // Toda categoria tem seus próprios gastos diretos
    }

    // Método que será implementado pelas classes filhas
    calcularTotalGasto() {
        throw new Error("Método 'calcularTotalGasto()' deve ser implementado.");
    }

    // Adiciona um gasto a esta categoria específica
    adicionarGasto(gasto) {
        this.gastos.push(gasto);
    }
}