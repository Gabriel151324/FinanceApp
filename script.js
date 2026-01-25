let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

function hoje() {
  return new Date().toLocaleDateString();
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  render();
}

function addVenda() {
  vendas.push({
    id: Date.now(),
    data: hoje(),
    valor: Number(vendaValor.value),
    pagamento: vendaPagamento.value,
    obs: vendaObs.value
  });
  salvar();
}

function addGasto() {
  gastos.push({
    id: Date.now(),
    data: hoje(),
    valor: Number(gastoValor.value),
    categoria: gastoCategoria.value,
    obs: gastoObs.value
  });
  salvar();
}

function salvar() {
  localStorage.setItem("vendas", JSON.stringify(vendas));
  localStorage.setItem("gastos", JSON.stringify(gastos));
  vendaValor.value = gastoValor.value = "";
  vendaObs.value = gastoObs.value = "";
  atualizar();
  render();
}

function excluir(tipo, id) {
  if (tipo === "venda") vendas = vendas.filter(v => v.id !== id);
  else gastos = gastos.filter(g => g.id !== id);
  salvar();
}

function editar(tipo, id) {
  const lista = tipo === "venda" ? vendas : gastos;
  const item = lista.find(i => i.id === id);
  const novoValor = prompt("Novo valor:", item.valor);
  if (novoValor) item.valor = Number(novoValor);
  salvar();
}

function render() {
  listaVendas.innerHTML = "";
  vendas.filter(v => v.data === hoje()).forEach(v => {
    listaVendas.innerHTML += `
      <li>
        R$ ${v.valor} - ${v.pagamento}
        <div class="actions">
          <button class="edit" onclick="editar('venda', ${v.id})">✏️</button>
          <button class="delete" onclick="excluir('venda', ${v.id})">🗑</button>
        </div>
      </li>`;
  });

  listaGastos.innerHTML = "";
  gastos.filter(g => g.data === hoje()).forEach(g => {
    listaGastos.innerHTML += `
      <li>
        R$ ${g.valor} - ${g.categoria}
        <div class="actions">
          <button class="edit" onclick="editar('gasto', ${g.id})">✏️</button>
          <button class="delete" onclick="excluir('gasto', ${g.id})">🗑</button>
        </div>
      </li>`;
  });
}

function atualizar() {
  const totalV = vendas.reduce((a,b)=>a+b.valor,0);
  const totalG = gastos.reduce((a,b)=>a+b.valor,0);
  totalVendas.innerText = totalV.toFixed(2);
  totalGastos.innerText = totalG.toFixed(2);
  lucro.innerText = (totalV - totalG).toFixed(2);
}

atualizar();
render();
