# hospeda.dev

Site institucional (landing page) para uma hospedagem de sites e APIs, com um
back-end simples em Node/Express que serve o front-end estático e expõe
algumas rotas de API de exemplo.

## Rodando localmente

```bash
npm install
npm start
```

O site sobe em `http://localhost:3000`.

## Estrutura

```
hospeda-dev/
├── public/          # front-end (HTML, CSS, JS)
├── server.js         # servidor Express
├── package.json
├── render.yaml        # blueprint de deploy do Render
└── .gitignore
```

## Subindo pro GitHub

```bash
cd hospeda-dev
git init
git add .
git commit -m "primeiro commit: site hospeda.dev"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Troque `SEU_USUARIO/SEU_REPOSITORIO` pelo repositório que você criar no GitHub.

## Deploy no Render

**Opção A — usando o `render.yaml` (Blueprint, mais rápido):**

1. Suba o projeto pro GitHub (passo acima).
2. No painel do Render, clique em **New +** → **Blueprint**.
3. Selecione o repositório. O Render vai ler o `render.yaml` sozinho e configurar tudo.
4. Clique em **Apply** e aguarde o build.

**Opção B — manual:**

1. No painel do Render, clique em **New +** → **Web Service**.
2. Conecte o repositório do GitHub.
3. Configure:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Clique em **Create Web Service**.

Depois do deploy, o Render te dá uma URL do tipo
`https://hospeda-dev.onrender.com` — o site e a API (`/api/status`,
`/api/planos`, `/api/contato`) ficam disponíveis nela.

## Próximos passos sugeridos

- Trocar o formulário de contato por um envio real (e-mail ou banco de dados).
- Ligar `/api/planos` a um banco de dados de verdade.
- Registrar um domínio próprio e apontá-lo pro serviço no Render.
