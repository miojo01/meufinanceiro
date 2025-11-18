import { ICategoria } from "./ICategoria.js";

// Esta é a "Folha" (Leaf). Representa uma categoria final, 
// que não possui subcategorias. Ex: "Netflix", "Aluguel".
export class CategoriaSimples extends ICategoria {
    constructor(nome) {
        super(nome);
    }

    // Calcula o total somando apenas os seus próprios gastos.
    calcularTotalGasto() {
        return this.gastos.reduce((total, gasto) => total + gasto.valor, 0);
    }
}