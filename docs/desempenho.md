# Relatório de Desempenho e Confiabilidade (SRE) — ClinicFlow API

## 1. Service Level Objectives (SLOs)
Para garantir uma experiência responsiva e estável aos sistemas consumidores, foram estabelecidos os seguintes objetivos:

| Indicador (SLI) | Objetivo (SLO) | Justificativa |
| :--- | :--- | :--- |
| **Latência (p95)** | `< 200ms` | 95% das requisições devem ser concluídas em menos de 200 milissegundos. |
| **Taxa de Erros** | `0%` (Disponibilidade 99.9%) | Nenhuma falha HTTP (`5xx` ou timeout) tolerada sob carga nominal. |

## 2. Metodologia de Teste (Smoke Test com k6)
* **Ferramenta:** Grafana k6
* **Configuração:** 1 Virtual User (VU) constante durante `30s`, realizando requisições `GET /appointments` com intervalo (`sleep`) de `1s`.
* **Instrumentação:** Coleta simultânea de contadores HTTP via `prom-client` no endpoint `/metrics`.

## 3. Resultados Obtidos
* **Status HTTP:** 100% das verificações (`check`) retornaram `200 OK`.
* **Latência p95:** Dentro do limiar estabelecido (`< 200ms`).
* **Taxa de Falha (`http_req_failed`):** `0.00%` (Threshold aprovado).

## 4. Como Reproduzir
Com a API em execução (`docker compose up`), execute na raiz do projeto:
```bash
k6 run load-test.js