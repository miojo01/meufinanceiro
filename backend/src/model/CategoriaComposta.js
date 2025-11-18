import { ICategoria } from "./ICategoria.js";

// Este é o "Composite". Representa uma categoria que agrupa
// outras categorias (filhas). Ex: "Moradia", "Lazer".
export class CategoriaComposta extends ICategoria {
    constructor(nome) {
        super(nome);
        this.subcategorias = []; // Lista de 'ICategoria' (filhos)
    }

    adicionarSubcategoria(categoria) {
        if (categoria instanceof ICategoria) {
            this.subcategorias.push(categoria);
        } else {
            throw new Error("Subcategoria deve ser uma instância de ICategoria.");
        }
    }

    // Esta é a mágica do Composite:
    // O total de uma categoria composta é a soma dos seus gastos diretos
    // MAIS a soma do total de todas as suas subcategorias.
    calcularTotalGasto() {
        // 1. Soma os gastos diretos desta categoria (Ex: "Taxa de Condomínio")
        const totalGastosDiretos = this.gastos.reduce((total, gasto) => total + gasto.valor, 0);

        // 2. Soma o total de CADA subcategoria (recursivamente)
        const totalGastosSubcategorias = this.subcategorias.reduce((total, subcategoria) => {
            return total + subcategoria.calcularTotalGasto();
        }, 0);

        return totalGastosDiretos + totalGastosSubcategorias;
    }
}