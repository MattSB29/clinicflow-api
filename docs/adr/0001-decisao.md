---
status: accepted
date: 2026-11-16
decision-makers: Matheus Bastos
---

# Adoção de Clean Architecture e Strategy Pattern na ClinicFlow API

## Contexto e Declaração do Problema

A ClinicFlow API precisa gerenciar agendamentos clínicos com regras de priorização de triagem variáveis conforme a especialidade e urgência do paciente. O sistema necessita de alto desacoplamento entre a lógica de negócio e o framework HTTP (Express), permitindo a execução de testes automatizados rápidos e isolados sem dependência de infraestrutura externa, além de suportar futuras extensões de regras sem comprometer o código existente.

## Direcionadores da Decisão (Decision Drivers)

* **Testabilidade:** Necessidade de manter cobertura de testes unitários e de integração superior a 80% com execução rápida via Vitest.
* **Manutenibilidade e Extensibilidade:** Facilidade para adicionar novos critérios de priorização de triagem sem alterar serviços já validados (Princípio Aberto/Fechado).
* **Desacoplamento de Infraestrutura:** Independência entre as regras de domínio e bibliotecas externas (Express, bancos de dados, `prom-client`).

## Opções Consideradas

* **Opção 1:** Arquitetura em Camadas Simples (MVC tradicional) com condicionais (`if/else` ou `switch`) nos serviços.
* **Opção 2:** Clean Architecture (separação em `controllers`, `use-cases`, `services` e `repositories`) combinada com o padrão comportamental **Strategy Pattern**.

## Resultado da Decisão (Decision Outcome)

Opção escolhida: **"Opção 2: Clean Architecture combinada com Strategy Pattern"**, pois atende diretamente aos direcionadores de testabilidade e extensibilidade, isolando o domínio e encapsulando as regras variáveis de triagem.

### Consequências

* **Bom, porque** os casos de uso dependem apenas de interfaces de repositório (Inversão de Dependência), permitindo testar fluxos completos em memória em milissegundos.
* **Bom, porque** novas regras de classificação de prioridade (`TriagePriorityStrategy`) podem ser adicionadas criando novas classes estratégicas sem modificar os serviços consumidores.
* **Ruim, porque** exige maior quantidade de arquivos, interfaces e código estrutural (*boilerplate*) inicial para operações simples.

## Prós e Contras das Opções

### Opção 1: MVC Tradicional com Condicionais

* **Bom, porque** possui menor curva de aprendizado e menor número de arquivos iniciais.
* **Ruim, porque** acopla a regra de negócio ao ciclo de requisição/resposta do Express, dificultando testes unitários isolados.
* **Ruim, porque** o crescimento das regras de triagem gera blocos condicionais extensos e propensos a regressões.

### Opção 2: Clean Architecture + Strategy Pattern

* **Bom, porque** garante isolamento total das regras de negócio e alta cobertura de testes automatizados.
* **Bom, porque** facilita a substituição de adaptadores de infraestrutura (ex: troca de repositório em memória para banco relacional) sem impacto no domínio.
* **Ruim, porque** aumenta a complexidade estrutural inicial do repositório.