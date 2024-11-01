# 1. Visão Geral da Arquitetura
Este sistema será uma plataforma de agendamento e triagem médica, com funcionalidades de geolocalização para melhorar o acesso a serviços de saúde, incluindo triagem comunitária e monitoramento de pacientes. Ele é composto por um backend em Java (Spring Boot), responsável pela lógica de negócios e persistência de dados, e um frontend em Node.js com renderização dinâmica e interfaces em Angular.

## 2. Interesses (Stakeholders) e Visão de Interesses
- Pacientes (Usuários): Precisam agendar consultas próximas e receber notificações em tempo real.
- Profissionais de Saúde: Necessitam monitorar e orientar pacientes remotamente.
- Administradores de Saúde: Necessitam de relatórios e mapas de demandas para designar recursos e triagens eficientes.
- Equipe de Desenvolvimento e Suporte: Precisa de uma arquitetura modular, de fácil manutenção e escalável.
## 3. Visão de Contexto
O sistema terá uma arquitetura cliente-servidor distribuída, onde o backend (Java + Spring Boot) se conecta ao frontend (Node.js e React Native) e a um banco de dados relacional. O sistema utiliza APIs RESTful para comunicação, uma API de geolocalização para coletar dados de localização e um sistema de notificações push.

## 4. Visão de Arquitetura
### 4.1. Visão Funcional
Cada funcionalidade será representada como um serviço independente ou endpoint, seguindo o princípio de microserviços.

#### Serviço de Agendamento de Consultas

- Endpoint RESTful para operações de CRUD de agendamento.
- Utiliza uma API de geolocalização para filtrar e exibir unidades de saúde próximas.
#### Serviço de Triagem Comunitária

- Fornece mapas com a distribuição dos pacientes e indica áreas de maior demanda.
- Algoritmo de filtragem por localização e categorização de triagem.

#### Serviço de Notificações de Consulta Próxima

- Monitora a disponibilidade de consultas e envia notificações push para os usuários.
- Usa serviços de geolocalização e um gerenciador de eventos para detecção de consultas próximas.
  
#### Serviço de Histórico de Consultas Georreferenciado

Armazena e exibe o histórico de consultas com informações de data e localização.
Filtros de localização e data.


### 4.2. Visão de Informações
Banco de Dados Relacional: Centralizado para armazenar informações de usuários, agendamentos, triagem e histórico de consultas.
API de Geolocalização: Integrada para capturar e processar dados de localização.
Serviço de Notificações Push: Para envio de alertas em tempo real sobre consultas e agendamentos.
### 4.3. Visão de Implantação
O sistema será implementado em uma arquitetura de nuvem híbrida para escalabilidade e alta disponibilidade:

#### Backend: Implantado em servidores de nuvem, com balanceamento de carga para suportar altos volumes de usuários.
#### Frontend: Hospedado como aplicação web e integrado ao backend via API RESTful.
#### Banco de Dados: Usará uma instância gerenciada em nuvem, com backup automatizado e réplica em várias regiões para alta disponibilidade.
### 4.4. Visão de Desenvolvimento
- Controle de Versão: Git para gerenciar o código-fonte e facilitar a colaboração.
- Integração Contínua/Entrega Contínua (CI/CD): Configuração de pipelines para deploy automático.
- Testes Automatizados: Cobertura de testes unitários para as principais funcionalidades e testes de integração para APIs.
## 5. Requisitos Não Funcionais
- Desempenho: Resposta em tempo real para geolocalização e notificações.
- Escalabilidade: Infraestrutura em nuvem para expandir a capacidade conforme a demanda.
- Segurança: Autenticação JWT e criptografia para proteção dos dados de pacientes.
- Confiabilidade: Failover e balanceamento de carga para garantir alta disponibilidade.
## 6. Conclusão
Essa arquitetura atende a requisitos de localização, agendamento e triagem, com um sistema modular que facilita manutenção e escalabilidade. A visão integrada entre backend e frontend permitirá atender às necessidades de acessibilidade e eficiência em saúde, especialmente para áreas carentes.
