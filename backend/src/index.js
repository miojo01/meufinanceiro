import express from 'express';
import cors from 'cors';

// "index.js" atua como cliente do Facade, a prova que o padrão ta funcionando está aqui no controlador da API

// Repare que é importado apenas a FinanceiroFacade, o cliente (index.js) não precisa saber dos detalhes internos dos subsistemas
import { FinanceiroFacade } from './financeiroFacade.js';

const app = express();
app.use(cors()); 
app.use(express.json());
const port = 3001;

const facade = new FinanceiroFacade();

// --- ROTAS DA API ---

// Rota [GET] /api/dashboard
// O frontend vai chamar essa rota para carregar a tela inicial
app.get('/api/dashboard', (req, res) => {
    // Usa o Facade para obter os dados do dashboard
    try {
        const dados = facade.obterDashboard();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// O endpoint POST /api/gasto recebe o pedido e delega tudo numa única linha para o Facade

// Rota [POST] /api/gasto
// O frontend chama essa rota para salvar um novo gasto
app.post('/api/gasto', (req, res) => {
    try {
        const { descricao, valor, categoria, tipo } = req.body;
        
        if (!descricao || !valor || !categoria || !tipo) {
            return res.status(400).json({ erro: "Dados incompletos." });
        }

        // Usa o Facade para registrar o novo gasto
        const dadosAtualizados = facade.registrarNovoGasto(descricao, valor, categoria, tipo);
        
        // Retorna os dados atualizados do dashboard
        res.status(201).json(dadosAtualizados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
});

/* Resumo da Implementação

Cliente: index.js -> faz requisições HTTP ao Facade.

Facade (O Porteiro): FinanceiroFacade -> recebe o pedido do cliente e coordena os 

Subsistemas: servicos/*.js -> executam a lógica de negócio real. */