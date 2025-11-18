import { categorias } from "../database.js";
import { CategoriaComposta } from "../model/CategoriaComposta.js";
import { CategoriaSimples } from "../model/CategoriaSimples.js";

// Subsistema 2: Gerencia a árvore de categorias

// Função para encontrar qualquer categoria (simples ou composta) na árvore
function encontrarCategoria(nome, lista = categorias) {
    for (const cat of lista) {
        if (cat.nome.toLowerCase() === nome.toLowerCase()) {
            return cat;
        }
        // Se for composta, busca nos filhos
        if (cat instanceof CategoriaComposta) {
            const encontrada = encontrarCategoria(nome, cat.subcategorias);
            if (encontrada) return encontrada;
        }
    }
    return null; // Não encontrou
}

export function associarGastoACategoria(gasto, nomeCategoria) {
    const categoria = encontrarCategoria(nomeCategoria);
    
    if (categoria) {
        categoria.adicionarGasto(gasto);
        console.log(`Gasto de ${gasto.valor} associado à categoria ${nomeCategoria}`);
        return true;
    } else {
        console.warn(`Categoria '${nomeCategoria}' não encontrada.`);
        return false;
    }
}

export function obterTotaisPorCategoria() {
    // Retorna um resumo dos totais de todas as categorias principais
    return categorias.map(cat => ({
        nome: cat.nome,
        total: cat.calcularTotalGasto()
    }));
}

// Funções de setup para popularmos nosso "banco"
export function setupCategoriasIniciais() {
    if (categorias.length > 0) return; // Só roda uma vez

    const moradia = new CategoriaComposta("Moradia");
    moradia.adicionarSubcategoria(new CategoriaSimples("Aluguel"));
    moradia.adicionarSubcategoria(new CategoriaSimples("Luz"));
    
    const lazer = new CategoriaComposta("Lazer");
    lazer.adicionarSubcategoria(new CategoriaSimples("Streaming"));
    lazer.adicionarSubcategoria(new CategoriaSimples("Restaurante"));

    categorias.push(moradia);
    categorias.push(lazer);
    categorias.push(new CategoriaSimples("Salário")); // Categoria para receitas

    console.log("Categorias iniciais criadas.");
}