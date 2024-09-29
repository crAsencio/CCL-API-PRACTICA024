// leyes-sociales.js
class LeyesSociales {
    constructor(tasaContribucion = 0.1) {
        this.tasaContribucion = tasaContribucion;
    }

    calcularContribucion(sueldo) {
        return sueldo * this.tasaContribucion;
    }

    obtenerInformacion(sueldo) {
        return `Contribución de Leyes Sociales: ${this.calcularContribucion(sueldo)} sobre un sueldo de ${sueldo}`;
    }
}

export { LeyesSociales };
