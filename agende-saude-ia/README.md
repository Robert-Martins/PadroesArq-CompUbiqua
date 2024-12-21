# Como Configurar e Rodar a API de IA

Este guia descreve os passos para configurar e executar a API de IA desenvolvida com NestJS. 

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- Node.js (versão LTS recomendada)
- npm ou yarn para gerenciar pacotes
- Git para controle de versão
- Um editor de texto, como o VS Code

## Configuração de Variáveis de Ambiente

A API exige a definição de uma variável de ambiente para autenticação. Siga os passos abaixo:

1. Na raiz do projeto, crie um arquivo chamado `.env`.
2. Adicione a seguinte linha ao arquivo:

```
API_KEY=<SUA_CHAVE_DE_API>
```

Substitua `<SUA_CHAVE_DE_API>` por qualquer valor para fins de desenvolvimento ou pela chave real em ambientes de produção. Exemplo:

```
API_KEY=123456789abcdef
```

## Instalação

1. Clone o repositório:

```
git clone https://github.com/seu-usuario/ia-api.git
cd ia-api
```

2. Instale as dependências necessárias:

```
npm install
```

## Executando a API

1. Inicie o servidor de desenvolvimento:

```
npm run start:dev
```

2. A API estará disponível no endereço padrão:

```
http://localhost:3000
```

## Testando a API

Você pode testar os endpoints da API utilizando:

- **Postman** ou **Insomnia**: Configure requisições HTTP com o cabeçalho `Authorization` contendo o valor da `API_KEY`.
- **cURL** no terminal. Exemplo:

```
curl -H "Authorization: Bearer 123456789abcdef" http://localhost:3000/endpoint
```

Substitua `/endpoint` pelo endpoint específico que deseja testar.