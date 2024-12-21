# Como Rodar o App - Agende Saúde

Este guia descreve os passos para configurar e executar o aplicativo **Agende Saúde**, desenvolvido em React Native 0.76 com Expo.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes itens instalados:

- Node.js (versão LTS recomendada)
- Expo CLI (instale globalmente com `npm install -g expo-cli`)
- Git para controle de versão
- Editor de texto, como o VS Code
- Um simulador ou dispositivo físico com o aplicativo Expo Go:
  - iOS: Expo Go disponível na App Store
  - Android: Expo Go disponível no Google Play

## Configuração de Variáveis de Ambiente

O aplicativo requer a definição de uma variável de ambiente para funcionar. Siga os passos abaixo:

1. Na raiz do projeto, crie um arquivo chamado `.env`.
2. Adicione a seguinte linha ao arquivo:

```
EXPO_PUBLIC_AGENDE_SAUDE_API_URL=<URL_DA_API>
```

Substitua `<URL_DA_API>` pelo endereço da API. Exemplo:

```
EXPO_PUBLIC_AGENDE_SAUDE_API_URL=https://agende-saude-api-e77798bbe00c.herokuapp.com
```

## Instalação

1. Clone o repositório:

```
git clone https://github.com/Robert-Martins/PadroesArq-CompUbiqua/tree/master
cd agende-saude-app
```

2. Instale as dependências necessárias:

```
npm install
```

3. Verifique se o arquivo `.env` foi configurado corretamente.

## Executando o Aplicativo

1. Inicie o servidor de desenvolvimento do Expo:

```
expo start
```

2. Um QR Code será exibido no terminal ou na interface web do Expo.

3. Use o aplicativo **Expo Go** no seu dispositivo para escanear o QR Code:
   - iOS: Abra a câmera e escaneie o código.
   - Android: Abra o Expo Go e escaneie o código.