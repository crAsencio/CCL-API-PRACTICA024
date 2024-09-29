// estado-de-renta.js
class EstadoDeRenta {
    constructor(ingresos = 0, gastos = 0) {
        this.ingresos = ingresos;
        this.gastos = gastos;
    }

    registrarIngresos(cantidad) {
        this.ingresos += cantidad;
    }

    registrarGastos(cantidad) {
        this.gastos += cantidad;
    }

    obtenerEstado() {
        const beneficio = this.ingresos - this.gastos;
        return `Ingresos: ${this.ingresos}, Gastos: ${this.gastos}, Beneficio: ${beneficio}`;
    }
}

export { EstadoDeRenta };
