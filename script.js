/* ======================
   ESTADO GLOBAL
====================== */
let ganhos = JSON.parse(localStorage.getItem("ganhos")) || [];
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

/* ======================
   ELEMENTOS DASHBOARD
====================== */
const totalGanhos = document.getElementById("totalGanhos");
const totalGastos = document.getElementById("totalGastos");
const lucro = document.getElementById("lucro");

/* ======================
   NAVEGAÇÃO
====================== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* ======================
   SALVAR
====================== */
function salvar() {
  localStorage.setItem("ganhos", JSON.stringify(ganhos));
  localStorage.setItem("gastos", JSON.stringify(gastos));
  atualizar();
}

/* ======================
   ADICIONAR GANHO
====================== */
function addGanho() {
  const input = document.getElementById("ganhoValor");
  const valor = Number(input.value);

  if (!valor || valor <= 0) {
    alert("Informe um valor válido");
    return;
  }

  ganhos.push({
    id: Date.now(),
    valor
  });

  input.value = "";
  salvar();
}

/* ======================
   ADICIONAR GASTO
====================== */
function addGasto() {
  const input = document.getElementById("gastoValor");
  const valor = Number(input.value);

  if (!valor || valor <= 0) {
    alert("Informe um valor válido");
    return;
  }

  gastos.push({
    id: Date.now(),
    valor
  });

  input.value = "";
  salvar();
}

/* ======================
   ATUALIZAR DASHBOARD
====================== */
function atualizar() {
  const totalG = ganhos.reduce((s, g) => s + Number(g.valor), 0);
  const totalGa = gastos.reduce((s, g) => s + Number(g.valor), 0);

  totalGanhos.innerText = totalG.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  totalGastos.innerText = totalGa.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  lucro.innerText = (totalG - totalGa).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  renderListas();
}

/* ======================
   LISTAS
====================== */
function renderListas() {
  const listaGanhos = document.getElementById("listaGanhos");
  const listaGastos = document.getElementById("listaGastos");

  if (listaGanhos) {
    listaGanhos.innerHTML = "";
    ganhos.forEach(g => {
      listaGanhos.innerHTML += `
        <li>
          R$ ${Number(g.valor).toFixed(2)}
          <button onclick="excluir('ganho', ${g.id})">🗑</button>
        </li>
      `;
    });
  }

  if (listaGastos) {
    listaGastos.innerHTML = "";
    gastos.forEach(g => {
      listaGastos.innerHTML += `
        <li>
          R$ ${Number(g.valor).toFixed(2)}
          <button onclick="excluir('gasto', ${g.id})">🗑</button>
        </li>
      `;
    });
  }
}

/* ======================
   EXCLUIR
====================== */
function excluir(tipo, id) {
  if (tipo === "ganho") {
    ganhos = ganhos.filter(g => g.id !== id);
  } else {
    gastos = gastos.filter(g => g.id !== id);
  }
  salvar();
}

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  atualizar();
  showPage("dashboard");
});
