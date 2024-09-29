// index.js
import express from 'express';
import { PORT } from './config.js';
import { UserRepository } from './user-repository.js';
import { IVA } from './iva.js';
import { EstadoDeRenta } from './estado-de-renta.js';
import { LeyesSociales } from './leyes-sociales.js';
import { Sueldos } from './sueldos.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    const username = undefined;
    res.render('example', { username });
});

// Ruta protegida que muestra la información después del login
app.get('/protected', (req, res) => {
    // Simulamos que el usuario está autenticado y tiene datos
    const username = 'usuarioEjemplo';

    // Simular datos para las clases
    const iva = new IVA();
    const estadoDeRenta = new EstadoDeRenta(10000, 3000);  // Ejemplo de ingresos y gastos
    const leyesSociales = new LeyesSociales();
    const sueldos = new Sueldos();
    sueldos.agregarSueldo(1500);  // Sueldo 1
    sueldos.agregarSueldo(2000);  // Sueldo 2

    // Generar información para enviar al frontend
    const ivaInfo = iva.obtenerInformacion(10000);  // Ejemplo de base imponible
    const estadoRentaInfo = estadoDeRenta.obtenerEstado();
    const leyesSocialesInfo = leyesSociales.obtenerInformacion(1500);  // Ejemplo con sueldo de 1500
    const sueldosInfo = sueldos.obtenerInformacion();

    // Renderizar el template con la información de las clases
    res.render('example', { 
        username, 
        ivaInfo, 
        estadoRentaInfo, 
        leyesSocialesInfo, 
        sueldosInfo 
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserRepository.login({ username, password });
        res.send({ user });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const id = await UserRepository.create({ username, password });
        res.send({ id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/logout', (req, res) => {
    res.send({ message: 'Sesión cerrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
