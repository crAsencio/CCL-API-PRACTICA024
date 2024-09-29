// sueldos.js
class Sueldos {
    constructor() {
        this.listaSueldos = [];
    }

    agregarSueldo(sueldo) {
        this.listaSueldos.push(sueldo);
    }

    calcularPromedio() {
        const total = this.listaSueldos.reduce((acc, sueldo) => acc + sueldo, 0);
        return total / this.listaSueldos.length;
    }

    obtenerInformacion() {
        return `Sueldo promedio: ${this.calcularPromedio()}`;
    }
}

export { Sueldos };


//________________________________
// sueldos.js
//import axios from 'axios';

//class Sueldos {
    //constructor() {
        // Inicializa una lista vacía para almacenar los sueldos
        //this.listaSueldos = [];
    //}

    //async obtenerInformacion() {
        //  try {
            // Realizar solicitud al servidor de la empresa para obtener los sueldos
            //  const response = await axios.get('http://servidor-empresa/api/sueldos');
            // Asigna los sueldos obtenidos a la listaSueldos
            //  this.listaSueldos = response.data.sueldos;

            // Calcula el total de sueldos sumando cada sueldo de la lista
           // const total = this.listaSueldos.reduce((acc, sueldo) => acc + sueldo, 0);
            // Calcula el promedio dividiendo el total entre la cantidad de sueldos
                            //const promedio = total / this.listaSueldos.length;

            // Retorna el sueldo promedio
           // return `Sueldo promedio: ${promedio}`;
        //} catch (error) {
            // Lanza un error en caso de que falle la solicitud
            //throw new Error('Error al obtener sueldos: ' + error.message);
        //}
    //}
//}

// Exporta la clase Sueldos para poder utilizarla en otros módulos
//export { Sueldos };
