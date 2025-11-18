import * as GastoService from './servicos/gastoService.js';
import * as CategoriaService from './servicos/categoriaService.js';
import { balanco } from './database.js';

// O Facade! Ele é a única "porta de entrada" que a nossa API (Fase 3)
// vai conhecer. Ele esconde toda a complexidade dos subsistemas.

export class FinanceiroFacade {
    
    constructor() {
        // Ao iniciar, já criamos as categorias de exemplo
        CategoriaService.setupCategoriasIniciais();
    }

    // Operação 1: Registrar um novo gasto (operação complexa)
    // Agora aceita 'tipo' também
    registrarNovoGasto(descricao, valor, nomeCategoria, tipo) {
        console.log(`Facade: Registrando ${tipo} de ${valor} em ${nomeCategoria}`);
        
        const novoLancamento = {
            id: Date.now().toString(),
            descricao,
            valor,
            tipo: tipo, // 'receita' ou 'despesa'
            data: new Date()
        };

        GastoService.registrarGasto(novoLancamento);
        
        // Só associamos à árvore de categorias se for despesa (para simplificar o Composite)
        // Ou podemos associar tudo, depende da sua regra. Vamos associar tudo.
        CategoriaService.associarGastoACategoria(novoLancamento, nomeCategoria);
        
        return this.obterDashboard();
    }

    // Operação 2: Obter os dados do Dashboard (operação de consulta)
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