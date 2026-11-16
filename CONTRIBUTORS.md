# Contribuidores

Este documento reconhece os autores e colaboradores responsáveis pelo desenvolvimento, arquitetura, testes e observabilidade da **ClinicFlow API**.

## Equipe Principal

| Nome | GitHub | Papel / Responsabilidades Principais |
| :--- | :--- | :--- |
| **Matheus Bastos** | [@MattSB29](https://github.com/MattSB29) | Arquitetura (Clean Architecture & Strategy Pattern), Implementação da API (Node.js/TypeScript), Testes Automatizados (Vitest/k6), Containerização (Docker) e Observabilidade (`prom-client` / SLOs). |

---

## Detalhamento de Contribuições

* **Arquitetura e Domínio:** Estruturação em camadas (`controllers`, `use-cases`, `services`, `repositories`), aplicação de Inversão de Dependência e encapsulamento de regras de triagem via *Strategy Pattern*.
* **Qualidade e Testes:** Suíte de testes unitários e de integração com cobertura superior a 80% (Vitest) e validação de carga/latência p95 < 200ms via k6.
* **Infraestrutura e SRE:** Pipeline de CI no GitHub Actions, empacotamento via Docker Compose, instrumentação de métricas Prometheus e documentação técnica (ADR MADR, OpenAPI 3.0 e Relatório de Desempenho).
