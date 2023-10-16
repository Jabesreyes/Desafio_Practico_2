function calculateTitle() {
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    return `Presupuesto de 
    ${month} ${year}`;
}

document.getElementById('title').innerText = calculateTitle();