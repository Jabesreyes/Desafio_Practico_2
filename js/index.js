function calculateTitle() {
  const date = new Date();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  const year = date.getFullYear();
  return `Presupuesto de 
  ${month} ${year}`;
}

document.getElementById('title').innerText = calculateTitle();

// array para almacenar las transacciones
const transactions = [];

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

// Función para mostrar solo Ingresos
function showIngresos() {
const transactionList = document.getElementById('transactionList');
transactionList.innerHTML = '';

transactions
  .filter((transaction) => transaction.type === 'Ingreso')
  .forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.className = 'ingreso';
    listItem.innerHTML = `<span class="descripcion">${transaction.description}</span> <span class="amount">+${transaction.amount}</span>`;
    transactionList.appendChild(listItem);
  });
}

// Función para mostrar solo Egresos
function showEgresos() {
const transactionList = document.getElementById('transactionList');
transactionList.innerHTML = '';
const total = transactions
  .filter((transaction) => transaction.type === 'Ingreso')
  .reduce((total, transaction) => total + transaction.amount, 0)
  .toFixed(2);
transactions
  .filter((transaction) => transaction.type === 'Egreso')
  .forEach((transaction) => {
    const formula = (transaction.amount * 100 / total).toFixed(2);
    const listItem = document.createElement('li');
    listItem.className = 'egreso';
    listItem.innerHTML = `<span class="descripcion">${transaction.description}</span> <span class="amount"> - $${transaction.amount}</span> -  <span class="porcent">(${formula}%)</span>`;
    transactionList.appendChild(listItem);
  });
}


// Manejo del formulario de transacciones
const transactionForm = document.querySelector('form');
transactionForm.addEventListener('submit', function (event) {
event.preventDefault();

const transactionType = transactionForm.querySelector('select').value;
const transactionDescription = transactionForm.querySelector('input[placeholder="Descripción"]').value;
const transactionAmount = parseFloat(transactionForm.querySelector('input[placeholder="Monto"]').value);

if (transactionType && transactionDescription && !isNaN(transactionAmount)) {
  addTransaction(transactionType, transactionDescription, transactionAmount);
  transactionForm.querySelector('select').value = "";
  transactionForm.querySelector('input[placeholder="Descripción"]').value = "";
  transactionForm.querySelector('input[placeholder="Monto"]').value = "";
}
});

// Botones para filtrar las transacciones
document.getElementById('btnEgreso').addEventListener('click', showEgresos);
document.getElementById('btnIngreso').addEventListener('click', showIngresos);

