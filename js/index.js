function calculateTitle() {
  const date = new Date();
  const month = date.toLocaleString("es-ES", { month: "long" });
  const year = date.getFullYear();
  return `Presupuesto de 
    ${month} ${year}`;
}

document.getElementById("title").innerText = calculateTitle();

// array para almacenar las transacciones
const transactionsIngreso = [];
const transactionsEgreso = [];

const sumaTotalIngresos = () => {
  return transactionsIngreso.reduce((acumulador, ingreso) => {
    return acumulador + ingreso.monto;
  }, 0);
};

// Función para agregar una transacción
function addTransaction(type, description, amount) {
  transactions.push({ type, description, amount });
  updateTransactionsList();
}

// Función para actualizar la lista de transacciones en el HTML
function updateTransactionsList() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.className = transaction.type === 'Ingreso' ? 'ingreso' : 'egreso';
    const sign = transaction.type === 'Ingreso' ? '+' : '-';
    listItem.innerHTML = `<span class="descripcion">${transaction.description}</span> <span class="amount">${sign}${transaction.amount}</span>`;
    transactionList.appendChild(listItem);
  });
  const totalMesElement = document.getElementById('totalMes');
  totalMesElement.innerText = calculateTotalMes();
  updatePorcentajeGastos();
  updateTotalIngresosEgresos();
}

function calculateTotalMes() {
  const totalIngresos = transactions
      .filter(transaction => transaction.type === 'Ingreso')
      .reduce((total, transaction) => total + transaction.amount, 0);

  const totalEgresos = transactions
      .filter(transaction => transaction.type === 'Egreso')
      .reduce((total, transaction) => total + transaction.amount, 0);

  const totalMes = totalIngresos - totalEgresos;

  return totalMes.toFixed(2);
}

function updatePorcentajeGastos() {
  const totalEgresos = transactions
      .filter(transaction => transaction.type === 'Egreso')
      .reduce((total, transaction) => total + transaction.amount, 0);

  const totalIngresos = transactions
      .filter(transaction => transaction.type === 'Ingreso')
      .reduce((total, transaction) => total + transaction.amount, 0);

  const porcentajeGastos = (totalEgresos * 100 / totalIngresos).toFixed(2);

  const porcentajeElement = document.querySelector('.porcentaje button');
  porcentajeElement.innerText = `${porcentajeGastos}%`;
}

function updateTotalIngresosEgresos() {
  const totalIngresos = transactions
    .filter((transaction) => transaction.type === 'Ingreso')
    .reduce((total, transaction) => total + transaction.amount, 0)
    .toFixed(2);

  const totalEgresos = transactions
    .filter((transaction) => transaction.type === 'Egreso')
    .reduce((total, transaction) => total + transaction.amount, 0)
    .toFixed(2);

  const ingresosElement = document.getElementById('ingresoss');
  const egresosElement = document.getElementById('egresoss');

  ingresosElement.innerText = '$' + totalIngresos;
  egresosElement.innerText = '$' + totalEgresos;
}

// Función para agregar una transacción
function addTransactionEgreso(tipo, descripcion, monto) {
  transactionsEgreso.push({ tipo, descripcion, monto });
}

// Manejo del formulario de transacciones
const transactionForm = document.querySelector("form");
transactionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const transactionType = transactionForm.querySelector("select").value;
  const transactionDescription = transactionForm.querySelector(
    'input[placeholder="Descripción"]'
  ).value;
  const transactionAmount = parseFloat(
    transactionForm.querySelector('input[placeholder="Monto"]').value
  );
  if (transactionType === "") {
    alert("Debes seleccionar un tipo de tramite.");
  } else if (transactionType === "Ingreso") {
    addTransactionIngreso(
      transactionType,
      transactionDescription,
      transactionAmount
    );
    

  saldo.textContent = sumaTotalIngresos();
    alert("Se agrego un nuevo ingreso.");
  } else {
    addTransactionEgreso(
      transactionType,
      transactionDescription,
      transactionAmount
    );
    alert("Se agrego un nuevo egreso");
  }
});

/* CODIGO DE CARLOS NO BORRAR */

btnEgreso.addEventListener("click", (e) => {
  e.preventDefault();
  boxEgresos.innerHTML = "";
  boxIngresos.innerHTML = "";
  transactionsEgreso.forEach((obj) => {
    const formula = (obj.monto * 100 / sumaTotalIngresos()).toFixed(2);
    boxEgresos.innerHTML += `
      <div class="egresoD">${obj.descripcion} - $${obj.monto} - (${formula}%)</div>
      `;
  });
});

btnIngreso.addEventListener("click", (e) => {
  e.preventDefault();
  boxIngresos.innerHTML = "";
  boxEgresos.innerHTML = "";
  transactionsIngreso.forEach((obj) => {
    boxIngresos.innerHTML += `
      <div class="egresoD">${obj.descripcion} - $${obj.monto} </div>
      `;
  });
});
