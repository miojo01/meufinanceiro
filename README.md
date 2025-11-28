# 💰 MeuFinanceiro

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

Sistema de controle financeiro pessoal desenvolvido como requisito avaliativo da disciplina de Engenharia de Software. O projeto foca na aplicação prática de padrões de projeto (Design Patterns) em uma arquitetura Web moderna.

## 📸 Demonstração

<img src="https://via.placeholder.com/800x400.png?text=Print+da+Tela+Inicial+do+Projeto" alt="Tela do Projeto">

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js, CSS Modules.
- **Backend:** Node.js, Express.
- **Persistência:** Armazenamento em memória (Array/Variables).

## 🧠 Padrões de Projeto (Design Patterns)

Este projeto implementa dois padrões estruturais do GoF:

### 1. Padrão Composite
Utilizado na estruturação das **Categorias de Despesas**.
- Permite tratar categorias simples (ex: "Aluguel") e compostas (ex: "Moradia") de forma uniforme.
- Facilita o cálculo recursivo de gastos totais por grupos de categorias.

### 2. Padrão Facade
Utilizado na camada de **API/Serviços**.
- A classe `FinanceiroFacade` simplifica a complexidade dos subsistemas internos (`GastoService`, `CategoriaService`, `Balanco`).
- O Frontend se comunica apenas com a fachada, reduzindo o acoplamento.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Clone o repositório
```bash
git clone [https://github.com/miojo01/meufinanceiro](https://github.com/miojo01/meufinanceiro)
cd MeuFinanceiro-Projeto
