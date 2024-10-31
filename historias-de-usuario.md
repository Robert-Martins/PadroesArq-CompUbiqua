# 1 - Funcionalidade: Agendamento de Consulta com Geolocalização

Como usuário
Eu quero agendar uma consulta médica com base em minha localização atual
Para que eu encontre facilmente profissionais e unidades de saúde próximas.

## Cenário: Agendar Consulta Próxima

Dado que o usuário está logado no sistema e com geolocalização ativada
Quando o usuário seleciona a opção de "agendar consulta"
Então o sistema exibe uma lista de unidades de saúde próximas com base na localização atual
E o usuário pode escolher a unidade de sua preferência e confirmar o agendamento.

# 2 - Funcionalidade: Triagem Comunitária via Localização

Como administrador de saúde
Eu quero realizar uma triagem comunitária de usuários com base na região
Para que eu possa otimizar o direcionamento de atendimentos médicos nas áreas mais carentes.

## Cenário: Triagem por Localização

Dado que os dados de localização dos usuários estão disponíveis no sistema
Quando o administrador acessa a funcionalidade de triagem comunitária
Então o sistema exibe mapas com a distribuição dos usuários, identificando áreas de maior demanda por consultas médicas
E o administrador pode designar recursos de saúde para essas áreas de forma mais eficiente.

# 3 - Funcionalidade: Receber Notificações de Consulta Próxima

Como usuário
Eu quero receber notificações quando houver consultas disponíveis próximas à minha localização
Para que eu aproveite oportunidades de agendamento rápido.

## Cenário: Notificação de Disponibilidade de Consulta

Dado que o sistema possui dados de localização do usuário e das unidades de saúde
Quando uma nova consulta está disponível em uma unidade próxima
Então o sistema envia uma notificação ao usuário informando sobre a vaga aberta
E o usuário pode clicar na notificação e realizar o agendamento diretamente.

# 4 - Funcionalidade: Monitoramento Remoto de Pacientes

Como profissional de saúde
Eu quero monitorar remotamente a localização dos pacientes em triagem
Para que eu possa acompanhar sua proximidade de unidades de saúde e otimizar o atendimento.

## Cenário: Acompanhamento de Paciente por Geolocalização

Dado que o paciente está participando de uma triagem comunitária e o sistema possui dados de sua localização
Quando o profissional acessa o painel de monitoramento
Então o sistema exibe a localização do paciente em tempo real em relação às unidades de saúde cadastradas
E o profissional pode orientar o paciente para a unidade mais próxima ou tomar decisões com base na proximidade.

# 5 - Funcionalidade: Histórico de Consultas Georreferenciado

Como usuário
Eu quero acessar o histórico das minhas consultas médicas com informações de localização
Para que eu possa visualizar onde e quando realizei atendimentos anteriores.

## Cenário: Consultar Histórico de Consultas

Dado que o usuário está logado no sistema e deseja acessar seu histórico de consultas
Quando o usuário acessa a seção de histórico no aplicativo
Então o sistema exibe uma lista de consultas passadas com informações de localização e data
E o usuário pode filtrar o histórico por local ou data para análises detalhadas.

# 6 - Funcionalidade: Compartilhamento de Localização com Profissional de Saúde

Como usuário
Eu quero compartilhar minha localização atual com meu profissional de saúde durante a triagem
Para que ele possa ajustar recomendações e encaminhamentos com base em minha proximidade de unidades de saúde.

## Cenário: Enviar Localização para o Profissional

Dado que o usuário está em um processo de triagem
Quando o profissional de saúde solicita informações de localização
Então o sistema permite que o usuário compartilhe sua localização em tempo real
E o profissional de saúde pode usar essa informação para direcionar o atendimento ou recomendação mais adequada.