![Logo Doação Certa](logo-doacao-certa.jpeg)

# Doação Certa

Projeto acadêmico desenvolvido por estudantes do 1º ano de Engenharia de Software da FIAP (turma 1ESOR) para a **Global Solution 2026/2 — CitizenTech**.

A Doação Certa é um protótipo de plataforma para ajudar a direcionar doações e voluntários durante enchentes e outros desastres. A proposta é conectar as necessidades atualizadas dos abrigos às pessoas que querem ajudar, reduzindo doações excedentes, desperdício e deslocamentos desnecessários.

> **Importante:** este repositório contém uma demonstração front-end. Os abrigos, regiões e necessidades da simulação são fictícios. O protótipo não é um canal real de emergência, não recebe doações e não contata abrigos ou voluntários.

## Para quem é

- **Doadores:** consultam o que está faltando e onde entregar.
- **Voluntários:** informam como e quando podem ajudar.
- **Coordenadores de abrigo e poder público:** conhecem a proposta de organização e priorização das necessidades.
- **Pessoas abrigadas:** são o público beneficiado pela entrega mais direcionada de itens e serviços.

## O que o protótipo oferece

- Apresentação do problema e da proposta da Doação Certa.
- Simulação de necessidades de abrigos, com filtro por item e região.
- Ordenação de abrigos por pontuação:
  - urgência alta: **3 pontos**; média: **2**; baixa: **1**;
  - abrigo na região selecionada: **+2 pontos**;
  - ocupação acima de 90%: **+1 ponto**.
- Confirmação simulada de uma doação, com atualização das quantidades na página.
- Formulário demonstrativo de voluntariado, com validação dos campos.
- Páginas sobre impacto, Objetivos de Desenvolvimento Sustentável (ODS), equipe e fontes.
- Controles de acessibilidade para aumentar ou diminuir o tamanho da fonte e alternar entre tema claro e escuro. As preferências ficam salvas no navegador quando o armazenamento local está disponível.

## Como executar

O projeto é estático e não precisa de instalação de dependências, servidor de aplicação ou banco de dados.

### Opção 1: abrir no navegador

Abra `index.html` na raiz do projeto diretamente em um navegador moderno. A navegação entre as páginas é feita pelo menu do próprio site.

### Opção 2: usar o Live Server no VS Code

1. Abra a pasta `doacao-certa` no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

Um servidor local pode ser preferível para evitar diferenças de comportamento entre navegadores ao abrir arquivos diretamente. Os ícones da interface são carregados pela biblioteca Ionicons via CDN; para carregá-los, é necessária uma conexão com a internet.

## Como usar

### Consultar e simular uma doação

1. Acesse **Solução** no menu.
2. No painel **Falta × Sobra**, consulte itens prioritários e itens que já estão sobrando.
3. No formulário **Quero doar**, selecione um item e, se desejar, uma região.
4. Clique em **Mostrar para onde levar** e compare os abrigos e os motivos da ordenação.
5. Selecione **Vou levar** em uma necessidade, preencha os dados solicitados e confirme para ver o resultado da simulação.

O botão de confirmação não envia dados a terceiros. As alterações da simulação existem apenas enquanto a página está aberta; ao recarregá-la, os dados voltam ao estado inicial.

### Simular um cadastro de voluntário

1. Acesse **Seja voluntário**.
2. Preencha os campos obrigatórios, escolha pelo menos uma forma de ajuda e aceite o aviso de privacidade.
3. Envie o formulário para visualizar uma confirmação demonstrativa.

Os dados do formulário não são enviados nem armazenados. Não use informações pessoais reais no protótipo.

### Ajustar a visualização

Use os controles **A-** e **A+** para alterar o tamanho do texto e os botões de sol e lua para alternar o tema. As preferências são guardadas localmente pelo navegador.

## Estrutura do projeto

```text
doacao-certa/
├── index.html              # Página inicial
├── css/                    # Folhas de estilo gerais e específicas de cada página
├── imagens/                # Logo, ilustração e imagem de perfil
├── js/                     # Interações, formulários e dados da simulação
├── templates/
│   ├── solucao.html         # Solução e simulação de doações
│   ├── seja-voluntario.html # Formulário demonstrativo de voluntariado
│   ├── impacto.html         # Impacto, indicadores e ODS
│   └── equipe.html          # Integrantes, fontes e créditos
└── README.md
```

O site foi construído com **HTML, CSS e JavaScript**, sem framework ou processo de compilação. O ponto de entrada é `index.html`.

## Limitações e próximos passos

Este protótipo não possui backend, autenticação, integração com a Defesa Civil, geolocalização, cadastro real de abrigos, armazenamento de doações ou comunicação com usuários. Os formulários apenas demonstram a experiência e validam informações no navegador. Portanto, as confirmações exibidas não representam compromissos reais de entrega ou voluntariado.

Na página **Impacto**, as metas apresentadas são propostas para um possível piloto, não resultados medidos. A própria página também descreve possíveis evoluções, como integração com órgãos públicos, suporte a outros tipos de desastre e uso entre crises.

## Contexto acadêmico e créditos

O projeto foi desenvolvido para a Global Solution da FIAP, com foco em tecnologia cidadã e resposta a desastres. A página **Equipe** identifica os integrantes, relaciona as fontes de dados e créditos e informa o uso de inteligência artificial generativa como apoio, com revisão do grupo.

Os dados reais citados no site são acompanhados pelas fontes indicadas na página inicial e em **Equipe**, incluindo Defesa Civil RS, Diário do Nordeste e ONU Brasil. Consulte essas páginas para o contexto e os créditos de cada informação.
