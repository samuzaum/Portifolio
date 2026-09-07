function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function render() {
  document.title = `${PROJECT.nome} · Painel de Desenvolvimento`;
  document.getElementById("titulo").textContent = PROJECT.nome;
  document.getElementById("subtitulo").textContent = PROJECT.subtitulo;

  let total = 0;
  let feitos = 0;
  CHECKLIST.forEach((bloco) => {
    bloco.itens.forEach((item) => {
      total += 1;
      if (item.feito) feitos += 1;
    });
  });
  const pct = total === 0 ? 0 : Math.round((feitos / total) * 100);

  document.getElementById("progressoPct").textContent = `${pct}%`;
  document.getElementById("progressoFill").style.width = `${pct}%`;
  document.getElementById("progressoLabel").textContent =
    `${feitos} de ${total} etapas concluídas`;

  const container = document.getElementById("meses");
  container.innerHTML = "";

  CHECKLIST.forEach((bloco, index) => {
    const totalBloco = bloco.itens.length;
    const feitosBloco = bloco.itens.filter((i) => i.feito).length;
    const concluidoBloco = feitosBloco === totalBloco;
    const emAndamentoBloco = feitosBloco > 0 && !concluidoBloco;

    const item = document.createElement("div");
    item.className = "timeline-item";

    const dot = document.createElement("div");
    dot.className =
      "timeline-dot" +
      (concluidoBloco ? " concluido" : emAndamentoBloco ? " andamento" : "");
    dot.textContent = concluidoBloco ? "✓" : String(index + 1);

    const content = document.createElement("div");
    content.className = "timeline-content";

    const card = document.createElement("div");
    card.className = "mes-card";

    const header = document.createElement("div");
    header.className = "mes-header";

    const titulo = document.createElement("span");
    titulo.className = "mes-titulo";
    titulo.textContent = bloco.mes;

    const status = document.createElement("span");
    status.className =
      "mes-status" + (concluidoBloco ? " concluido" : emAndamentoBloco ? " andamento" : "");

    const statusDot = document.createElement("span");
    statusDot.className = "status-dot";

    const statusTexto = document.createElement("span");
    statusTexto.textContent = concluidoBloco
      ? "concluído"
      : emAndamentoBloco
      ? `em andamento · ${feitosBloco}/${totalBloco}`
      : "não iniciado";

    status.appendChild(statusDot);
    status.appendChild(statusTexto);

    header.appendChild(titulo);
    header.appendChild(status);
    card.appendChild(header);

    const lista = document.createElement("ul");
    lista.className = "itens";

    bloco.itens.forEach((it) => {
      const li = document.createElement("li");

      const check = document.createElement("span");
      check.className = "check" + (it.feito ? " feito" : "");
      check.textContent = it.feito ? "✓" : "";

      const texto = document.createElement("span");
      texto.className = "item-texto" + (it.feito ? " feito" : "");
      texto.textContent = it.texto;

      li.appendChild(check);
      li.appendChild(texto);
      lista.appendChild(li);
    });

    card.appendChild(lista);
    content.appendChild(card);
    item.appendChild(dot);
    item.appendChild(content);
    container.appendChild(item);
  });

  document.getElementById("atualizadoEm").textContent = formatarData(PROJECT.atualizadoEm);
}

render();
