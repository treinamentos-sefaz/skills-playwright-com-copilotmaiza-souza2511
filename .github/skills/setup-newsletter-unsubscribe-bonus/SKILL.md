---
name: setup-newsletter-unsubscribe-bonus
description: Prepara sob demanda o bônus opcional de descadastro da Newsletter do Pinguim, criando requisitos, agentes customizados e material TDD sem implementar a funcionalidade da aplicação.
---

# Preparar bônus opcional de descadastro

Use esta skill somente quando o usuário solicitar explicitamente a preparação do bônus de descadastro da Newsletter do Pinguim.

Esta skill prepara os materiais e os agentes customizados. Ela **não implementa** a aplicação, não altera testes existentes e não executa o exercício de descadastro.

## 1. Inspecione antes de alterar

- Leia as instruções do repositório, `public/index.html`, `public/app.js`, os testes Playwright existentes, `playwright.config.js` e `.github/steps/x-review.md`.
- Execute `git status` e preserve todas as alterações existentes.
- Confirme o funcionamento atual do formulário de inscrição. Não presuma que o exercício já esteja implementado.
- Consulte a documentação atual do VS Code para custom agents e prompt files quando precisar confirmar frontmatter, caminhos ou delegação.
- Não altere código da aplicação, testes, workflows, dependências ou configuração do MCP.

## 2. Defina os requisitos do bônus

Crie `.github/steps/bonus-unsubscribe-requirements.md` com um contrato que estabeleça:

- Depois de uma inscrição bem-sucedida, mostrar um botão acessível `Cancelar inscrição`.
- Ao cancelar, limpar o estado da inscrição mantido em memória, anunciar `Inscrição cancelada!` em uma região de status e mostrar novamente o formulário.
- Permitir nova inscrição depois do cancelamento e preservar o formulário e a validação existentes.
- Declarar que o estado não persiste após recarregar a página.
- Excluir backend, banco de dados, API, `localStorage`, serviço de e-mail, remoção administrativa, exclusão de conta e alterações em workflows.
- Incluir critérios de aceitação observáveis e cenários Playwright derivados.
- Explicar que o descadastro é uma simulação de estado da interface, não o descadastro real de uma lista de e-mails.

## 3. Obtenha os custom agents

Os agentes devem ser obtidos somente durante esta preparação. Não instale agentes antes desta skill ser invocada.

Obtenha as versões atuais destes arquivos em `https://github.com/github/awesome-copilot/tree/main/agents`:

- `plan.agent.md`
- `playwright-tester.agent.md`
- `tdd-red.agent.md`
- `tdd-green.agent.md`
- `tdd-refactor.agent.md`

Coloque-os em `.github/agents/`, preservando atribuição e conteúdo de origem. Adapte apenas o necessário para compatibilidade com o repositório ou para remover pré-requisitos não aplicáveis, mantendo papel e limites.

Antes de instalar:

- Verifique arquivos já existentes no destino.
- Não sobrescreva agentes existentes.
- Se houver conflito, pare e peça decisão em vez de substituir.
- Se não conseguir ler a fonte upstream ou verificar compatibilidade, pare sem criar um orquestrador dependente de agentes indisponíveis e informe o bloqueio.
- Não invente issues ou números de issue.

Use o identificador ou nome invocável real declarado no arquivo obtido. Não suponha que o nome do arquivo seja o nome do agente.

## 4. Prepare os materiais do bônus

Crie `.github/steps/bonus-agents-unsubscribe.md` em português, como atividade opcional de até 30 minutos. Inclua:

- Referência ao documento de requisitos como contrato.
- Como selecionar e executar o agente orquestrador.
- Sequência e handoffs: planejamento, inspeção no browser com Playwright, RED, GREEN, refactor e verificação final.
- Regras para cada agente receber os requisitos e o resultado da fase anterior.
- Aviso de que a configuração inicial dos agentes ocorre somente ao executar esta skill.
- Critérios manuais, comandos de teste existentes e a limitação de estado em memória.
- Confirmação de que nenhum workflow obrigatório é criado ou alterado.

Crie `.github/agents/implementation-workflow-orchestrator.agent.md` no formato compatível com o workspace, configurando-o como agente invocável pelo usuário e com capacidade explícita de delegar aos especialistas instalados. Este agente deve ser reutilizável para outros requisitos de implementação, não específico ao descadastro; o bônus é apenas o primeiro caso de uso documentado.

O orquestrador deve receber os requisitos da implementação em contexto e:

1. Ler os requisitos fornecidos e verificar a disponibilidade dos especialistas.
2. Chamar cada especialista sequencialmente, passando os requisitos e os handoffs anteriores.
3. Garantir que RED adicione ou ajuste somente testes e demonstre uma falha pelo comportamento ausente antes de permitir GREEN.
4. Garantir que GREEN modifique somente o necessário na aplicação, não enfraqueça testes e execute os testes.
5. Permitir refactor somente com preservação do comportamento e nova verificação.
6. Encerrar com o comportamento verificado no browser quando aplicável e evidência dos testes.
7. Interromper e explicar falhas de gate, conflitos de requisitos ou agentes indisponíveis, sem pular fases ou substituir especialistas silenciosamente.

O orquestrador não edita código ou testes diretamente, não cria issues, não faz commits/pushes e não amplia o escopo dos requisitos recebidos.

Atualize `.github/steps/x-review.md` com uma seção curta que apresente os dois documentos bônus e identifique claramente a atividade como opcional.

## 5. Verifique o setup

Confirme que foram criados ou alterados apenas:

- Documentos do bônus em `.github/steps/`.
- Os custom agents previstos em `.github/agents/`.
- A referência opcional em `.github/steps/x-review.md`.

Confirme que nenhum workflow, código de produção, teste existente ou dependência foi alterado.

Verifique manualmente:

- Sintaxe e frontmatter dos arquivos de skill e agent.
- Links relativos entre os documentos.
- Ausência de referências a nomes invocáveis não confirmados.
- O diff final.

Ao concluir, relate arquivos criados ou alterados, agentes obtidos e limitações. Não afirme que a feature foi implementada nem que testes futuros de descadastro passaram.
