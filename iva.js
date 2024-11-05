class IVA {
    constructor(tasa = 0.21) {
        this.tasa = tasa;
    }

    async obtenerInformacion(base) {
        if (typeof base !== 'number' || base < 0) {
            throw new Error('La base debe ser un número positivo.');
        }

        try {
            const response = await fetch('http://localhost:3000/api/iva');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            const ivaCalculado = base * this.tasa;
            return {
                ivaSimulado: ivaCalculado,
                base,
                tasa: this.tasa * 100,
                datosDelServidor: data
            };
        } catch (error) {
            // Manejo de error para mostrar mensaje en la vista
            throw new Error('Error al obtener información de IVA: ' + error.message);
        }
    }
}

export { IVA };
