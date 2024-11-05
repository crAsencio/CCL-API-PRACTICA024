class Sueldos {
    constructor() {
        this.sueldos = []; // Almacena objetos con nombre y sueldo
    }

    agregarSueldo(empleado, sueldo) {
        if (typeof sueldo !== 'number' || sueldo < 0) {
            throw new Error('El sueldo debe ser un número positivo.');
        }
        this.sueldos.push({ empleado, sueldo }); // Almacena un objeto con el nombre del empleado y su sueldo
    }

    obtenerInformacion() {
        return this.sueldos; // Devuelve la lista de sueldos
    }
}

export { Sueldos };
