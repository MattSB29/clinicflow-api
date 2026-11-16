Nível escolhido: Projeto B (Individual)

# ClinicFlow API

![CI Status](https://github.com/MattSB29/clinicflow-api/actions/workflows/ci.yml/badge.svg)

API RESTful desenvolvida em **Node.js + TypeScript** para gerenciamento de agendamentos clínicos e triagem de prioridades, estruturada sob princípios de **Clean Architecture**, **SOLID (Strategy Pattern)** e práticas de **SRE**.

* **Nível / Escopo:** Backend Production-Ready (Containerizado, CI/CD, Cobertura de Testes > 80%, Métricas Prometheus e Smoke Tests).
* **Execução Verde do CI:** [Acessar histórico de builds no GitHub Actions](https://github.com/MattSB29/clinicflow-api/actions)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/) e **Docker Compose** (recomendado para rodar a aplicação containerizada)
* [Node.js](https://nodejs.org/) (v20+) e **npm** (caso deseje rodar localmente sem Docker ou executar os testes)

---

## Como Iniciar a Aplicação do Zero

### 1. Clonar o repositório
```bash
git clone [https://github.com/MattSB29/clinicflow-api.git](https://github.com/MattSB29/clinicflow-api.git)
cd clinicflow-api
```

### 2. Configurar as variáveis do ambiente
```bash
cp .env.example .env
```

## 3. Subir a Aplicação

### Via Docker Compose (Recomendado)
```bash
# Construir e iniciar os containers
docker compose up --build -d
# Para acompanhar os logs em tempo real
docker compose logs -f
# Para parar e remover os containers
docker compose down
```

### Via local
```bash
# Instalar dependências
npm install
# Iniciar a aplicação
npm run dev

# A API estará disponível em: http://localhost:3000
```

---

## Como testar

### Testes Unitários, Integração e Cobertura
```bash
# Executar suíte de testes
npm test

# Gerar relatório de cobertura (Meta global: >= 80%)
npm run test:coverage
```

### Testes de Carga / Smoke Test
```bash
# Com a API em execução na porta 3000:
k6 run k6/smoke-test.js
```

---

## Validação Manual e Observabilidade
```bash
# Verificar saúde da aplicação (Health Check)
curl -i http://localhost:3000/health

# Consultar métricas HTTP expostas para o Prometheus
curl -s http://localhost:3000/metrics | grep "clinicflow_http_requests_total"
```