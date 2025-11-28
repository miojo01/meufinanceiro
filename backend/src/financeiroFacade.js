import * as GastoService from './servicos/gastoService.js';
import * as CategoriaService from './servicos/categoriaService.js';
import { balanco } from './database.js';

// O Padrão Facade tem como objetivo fornecer uma interface simplificada para um subsistema complexo, isolando o código cliente da sua complexidade interna

// o padrão Facade nesta classe "FinanceiroFacade" atua como um wrapper que encapsula os subsistemas."
export class FinanceiroFacade {
    
    constructor() {
        // Inicializa categorias padrão
        CategoriaService.setupCategoriasIniciais();
    }

    // Quando chega um novo gasto, o Facade encarrega-se de chamar =>
    registrarNovoGasto(descricao, valor, nomeCategoria, tipo) {
        console.log(`Facade: Registrando ${tipo} de ${valor} em ${nomeCategoria}`);
        
        // Cria um novo lançamento
        const novoLancamento = {
            id: Date.now().toString(),
            descricao,
            valor,
            tipo: tipo, // 'receita' ou 'despesa'
            data: new Date()
        };

        // => o "GastoService" para atualizar o saldo e, logo de seguida =>
        GastoService.registrarGasto(novoLancamento);
        
        // => o "CategoriaService" para atualizar a árvore de categorias. O cliente não sabe que estas duas operações ocorrem separadamente.
        CategoriaService.associarGastoACategoria(novoLancamento, nomeCategoria);
        
        // Retorna os dados atualizados do dashboard
        return this.obterDashboard();
    }

    // Obtém os dados do dashboard combinando informações dos subsistemas
    obterDashboard() {
        console.log("Facade: Montando dados do dashboard");
        
        const totaisCategorias = CategoriaService.obterTotaisPorCategoria();
        const ultimosGastos = GastoService.listarTodosGastos().slice(-5); // Pega os últimos 5

        return {
            balanco: balanco,
            gastosPorCategoria: totaisCategorias,
            ultimosLancamentos: ultimosGastos
        };
    }
}