function calculateTitle() {
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    return `Presupuesto de 
    ${month} ${year}`;
}

document.getElementById('title').innerText = calculateTitle();

document.addEventListener('DOMContentLoaded', function () {
    const transactions = [];

    function updateResults() {
        // Función para calcular resultados y actualizar la interfaz
        const totalIncomes = transactions
            .filter(transaction => transaction.type === 'Ingreso')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

        const totalExpenses = transactions
            .filter(transaction => transaction.type === 'Egreso')
            .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

        const totalBudget = totalIncomes - totalExpenses;
        const expensePercentage = (totalExpenses * 100) / totalIncomes; 

        document.getElementById('totalIncomes').textContent = totalIncomes.toFixed(2);
        document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('totalBudget').textContent = totalBudget.toFixed(2);
        document.getElementById('expensePercentage').textContent = expensePercentage.toFixed(2) + '%';
    }

    document.getElementById('addTransaction').addEventListener('click', function () {
        const type = document.getElementById('transactionType').value;
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        if (type && description && amount) {
            transactions.push({ type, description, amount });
            updateResults();
            // Limpiar los campos después de agregar una transacción
            document.getElementById('transactionType').value = 'Ingreso';
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        }
    });

    // Actualizar el título de la aplicación con la fecha
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    const title = `Presupuesto de ${month} ${year}`;
    document.getElementById('title').textContent = title;
});
