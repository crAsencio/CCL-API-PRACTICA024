class LeyesSociales {
    constructor() {}

    async obtenerInformacion(url) {
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error('Error en la red');
            }
            const datos = await respuesta.json();
            if (!datos || datos.length === 0) {
                throw new Error('No hay leyes sociales disponibles.');
            }
            this.mostrarDatos(datos);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw new Error('Error al obtener leyes sociales: ' + error.message);
        }
    }

    mostrarDatos(datos) {
        console.table(datos);
    }
}

export { LeyesSociales };
