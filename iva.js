// iva.js
class IVA {
    constructor(tasa = 0.21) {
        this.tasa = tasa;
    }

    // Simular la obtención de datos
    async obtenerInformacion(base) {
        // Simulación de una respuesta del servidor
        const ivaCalculado = base * this.tasa;
        return `IVA simulado: ${ivaCalculado} sobre una base de ${base} con una tasa del ${this.tasa * 100}%`;
    }
}

export { IVA };
