# casaki mobile

Este repositório foi reiniciado e contém um starter minimal para o app mobile.

## Como usar

1. Instale o Node.js (versão LTS recomendada).
2. (Opcional) Instale o Expo CLI globalmente: `npm install -g expo-cli`
3. No diretório do projeto rode:

```powershell
npm install
npm run start
```

O projeto criado é um starter Expo + React Native + TypeScript mínimo. Adapte dependências conforme necessário.

## Como usar (Windows PowerShell)

```powershell
cd mobile
npm install
npx expo start --web
```

## Principais pontos
- Projeto minimalista pensado como um MVP mobile.
- Estrutura pronta para adicionar integração com a API do backend.
- Arquivos e dados sensíveis do backend devem permanecer confidenciais.

## Testing (mock mode)

We've added a single-command mock mode so evaluators can run the app locally without any backend.

1) Install and start (Windows PowerShell):

```powershell
npm install
npm run web:mock
```

2) What this does
- Sets `MOCK=true` for the process so the app uses an in-memory mock DB (events, padrinhos, presentes).
- Starts Expo in web mode so you can open the app in a browser (no emulator required).

3) Quick checklist for testers
- Open the web URL printed by Expo (usually http://localhost:19006). Navigate in the app.
- Dashboard -> "Próximos eventos": click "Ver" on an event to open details.
- Dashboard -> "Criar evento": create a new event (Title and Date required). After creation you should see the new event in the list.
- Open an event and click "Apagar evento" to remove it — confirm it no longer appears in the list.
- Presentes: reserve an available gift and confirm its status changes to "Reservado".

4) Notes
- All data is in-memory and will reset when you restart the server.
- If you prefer to run on a physical device, use `npm run start:mock` and open Expo Go.

If you want I can add a visible "Mock mode active" banner inside the app for testers — say the word and I will add it.
# casaki mobile

Este repositório foi reiniciado e contém um starter minimal para o app mobile.

Como usar
1. Instale o Node.js (versão LTS recomendada).
2. (Opcional) Instale o Expo CLI globalmente: npm install -g expo-cli
3. No diretório do projeto rode:

```powershell
npm install
npm run start
```

O projeto criado é um starter Expo + React Native + TypeScript mínimo. Adapte dependências conforme necessário.
Casaki Mobile (React Native)

Este repositório contém um MVP inicial em React Native (Expo) preparado para ser usado como base de app mobile e, futuramente, integrado ao backend do projeto Casaki.

Como usar (Windows PowerShell):

```powershell
cd mobile
npm install
npx expo start --web
```

Principais pontos:
- Projeto minimalista pensado como um MVP mobile.
- Estrutura pronta para adicionar integração com a API do backend.
- Arquivos e dados sensíveis do backend devem permanecer confidenciais.

Observação de confidencialidade:
Este código e as decisões de integração são para uso interno e não devem ser divulgados. Trate também o backend do projeto como informação sigilosa.
- Mantive tokens de estilo (cores/espacementos) baseados em `globals.css` do front para manter consistência visual.

## Testes rápidos (modo mock)

Para facilitar a avaliação, o app inclui um modo mock que roda tudo em memória (sem backend). Use o comando único abaixo para abrir a versão web:

```powershell
npm install
npm run web:mock
```

Checklist para o avaliador (funcionalidades principais):
- Abra a URL exibida pelo Expo (normalmente http://localhost:19006).
- Dashboard: os cartões representam ações e telas (Próximos eventos, Criar evento, Padrinhos, Presentes).
- Eventos: abra um evento para ver detalhes; teste "Apagar evento".
- Criar evento: crie um evento válido (Título e Data em YYYY-MM-DD); verifique se aparece na lista.
- Presentes: reserve um presente disponível; verifique que muda para "Reservado".

Observações:
- Os dados são temporários (in-memory) e serão reiniciados ao reiniciar o servidor.
- Se quiser testar em dispositivo físico, use `npm run start:mock` e abra pelo Expo Go.

Se preferir, adiciono um banner visível "Mock mode active" no topo do app para deixar claro ao avaliador.
