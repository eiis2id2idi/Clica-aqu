// ---------- Terminal animado no hero ----------
const deployLines = [
  "$ git push origin main",
  "→ recebendo build...",
  "→ instalando dependências (18s)",
  "→ compilando projeto...",
  "→ provisionando SSL...",
  "→ publicando em hospeda.dev",
  "",
  "✓ site no ar: https://seusite.hospeda.dev",
  "✓ api no ar: https://seusite.hospeda.dev/api",
];

async function typeTerminal() {
  const el = document.getElementById("terminal-output");
  if (!el) return;
  let full = "";
  for (const line of deployLines) {
    for (const char of line) {
      full += char;
      el.textContent = full;
      await sleep(14);
    }
    full += "\n";
    el.textContent = full;
    await sleep(220);
  }
  await sleep(1400);
  el.textContent = "";
  typeTerminal();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeTerminal();
} else {
  document.getElementById("terminal-output").textContent = deployLines.join("\n");
}

// ---------- Planos via API (com fallback já no HTML) ----------
fetch("/api/planos")
  .then((r) => r.json())
  .catch(() => null);

// ---------- Botão "chamar /api/status agora" ----------
const tryBtn = document.getElementById("try-status");
const liveResult = document.getElementById("live-result");
if (tryBtn) {
  tryBtn.addEventListener("click", async () => {
    liveResult.textContent = "chamando /api/status...";
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      liveResult.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      liveResult.textContent = "erro ao chamar a API: " + err.message;
    }
  });
}

// ---------- Formulário de contato ----------
const form = document.getElementById("contato-form");
const feedback = document.getElementById("form-feedback");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form).entries());
    feedback.textContent = "Enviando...";
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const data = await res.json();
      if (res.ok) {
        feedback.textContent = data.mensagem;
        form.reset();
      } else {
        feedback.textContent = data.erro || "Algo deu errado.";
      }
    } catch (err) {
      feedback.textContent = "Não foi possível enviar agora.";
    }
  });
}

// ---------- Ano no rodapé ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
