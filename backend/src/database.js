// Nossos dados "vivos" na memória.
// O 'export' permite que outros arquivos usem essas variáveis.

// Guarda todos os lançamentos individuais de gastos
export const gastos = [];

// Guarda todas as categorias (simples ou compostas)
export const categorias = [];

// Um balanço simples
export let balanco = {
    receitas: 0,
    despesas: 0,
    total: 0
};