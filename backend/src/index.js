import express from 'express';
import cors from 'cors';
import { FinanceiroFacade } from './financeiroFacade.js';

// Configuração do Servidor
const app = express();
app.use(cors());      // Permite que o frontend acesse o backend
app.use(express.json()); // Permite que o servidor entenda JSON
const port = 3001;       // Porta que o backend vai rodar

// Inicializa o nosso Facade
const facade = new FinanceiroFacade();

// --- NOSSAS ROTAS DA API ---

// Rota [GET] /api/dashboard
// O frontend vai chamar essa rota para carregar a tela inicial
app.get('/api/dashboard', (req, res) => {
    try {
        const dados = facade.obterDashboard();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota [POST] /api/gasto
// O frontend vai chamar essa rota para salvar um novo gasto
app.post('/api/gasto', (req, res) => {
    try {
        // Agora pegamos o 'tipo' do corpo da requisição
        const { descricao, valor, categoria, tipo } = req.body;
        
        if (!descricao || !valor || !categoria || !tipo) {
            return res.status(400).json({ erro: "Dados incompletos." });
        }

        const dadosAtualizados = facade.registrarNovoGasto(descricao, valor, categoria, tipo);
        
        res.status(201).json(dadosAtualizados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
});