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
function addTransactionIngreso(tipo, descripcion, monto) {
  transactionsIngreso.push({ tipo, descripcion, monto });
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
