const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------- API de exemplo ----------
// Essas rotas existem para provar que o mesmo serviço no Render
// hospeda site (arquivos estáticos) e API (JSON) ao mesmo tempo.

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    servico: "hospeda.dev",
    uptime_segundos: Math.floor(process.uptime()),
    hora: new Date().toISOString(),
  });
});

app.get("/api/planos", (req, res) => {
  res.json([
    { id: "starter", nome: "Starter", preco_mensal: 0, sites: 1, apis: 1, dominio_proprio: false },
    { id: "pro", nome: "Pro", preco_mensal: 29, sites: 10, apis: 10, dominio_proprio: true },
    { id: "scale", nome: "Scale", preco_mensal: 99, sites: "ilimitado", apis: "ilimitado", dominio_proprio: true },
  ]);
});

app.post("/api/contato", (req, res) => {
  const { nome, email, mensagem } = req.body || {};
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: "Preencha nome, email e mensagem." });
  }
  // Aqui entraria o envio real (e-mail, banco de dados, etc.)
  console.log("Novo contato:", { nome, email, mensagem });
  res.status(201).json({ ok: true, mensagem: "Recebemos sua mensagem, obrigado!" });
});

// Qualquer rota não-API cai no index.html (SPA-friendly)
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`hospeda.dev rodando na porta ${PORT}`);
});
