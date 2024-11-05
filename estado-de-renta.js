class EstadoDeRenta {
    constructor() {
        this.ingresos = 0;
        this.gastos = 0;
    }

    async obtenerDatosServidor() {
        try {
            const response = await fetch('http://localhost:3000/api/estado-de-renta');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('No hay datos de estado de renta disponibles.');
            }
            this.ingresos = data.ingresos || 0;
            this.gastos = data.gastos || 0;
        } catch (error) {
            throw new Error('Error al obtener datos del servidor: ' + error.message);
        }
    }

    registrarIngresos(cantidad) {
        if (typeof cantidad !== 'number' || cantidad < 0) {
            throw new Error('La cantidad de ingresos debe ser un número positivo.');
        }
        this.ingresos += cantidad;
    }

    registrarGastos(cantidad) {
        if (typeof cantidad !== 'number' || cantidad < 0) {
            throw new Error('La cantidad de gastos debe ser un número positivo.');
        }
        this.gastos += cantidad;
    }

    obtenerEstado() {
        const beneficio = this.ingresos - this.gastos;
        return {
            ingresos: this.ingresos,
            gastos: this.gastos,
            beneficio: beneficio
        };
    }
}

export { EstadoDeRenta };
