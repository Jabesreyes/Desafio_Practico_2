addEventListener('DOMContentLoaded', (e) => {

    const ingresos = [
        {
            "descripcion": "Pago Salarial",
            "deposito": 165
        },
        {
            "descripcion": "Pago de bono",
            "deposito": 35
        }
    ]

    const egresos = [
        {
            "descripcion": "Pago de luz",
            "gasto": 60
        },
        {
            "descripcion": "Pago de internet",
            "gasto": 35
        },
        {
            "descripcion": "Canasta Basica",
            "gasto": 50
        }
    ]

    const sumaTotalIngresos = ingresos.reduce((acumulador, ingreso) => {
        return acumulador + ingreso.deposito;
    }, 0);

    egreso.addEventListener("click", (e) => {
        e.preventDefault()
        boxEgresos.innerHTML = ""
        boxIngresos.innerHTML = ""
        egresos.forEach((obj) => {
            const formula = (obj.gasto * 100 / sumaTotalIngresos)
            boxEgresos.innerHTML += `
            <div class="egresoD">${obj.descripcion} - $${obj.gasto} - (${formula}%)</div>
            `
        })
    })

    ingreso.addEventListener("click", (e) => {
        e.preventDefault()
        boxIngresos.innerHTML = ""
        boxEgresos.innerHTML = ""
        ingresos.forEach((obj) => {
            boxEgresos.innerHTML += `
            <div class="egresoD">${obj.descripcion} - $${obj.deposito} </div>
            `
        })
    })
})