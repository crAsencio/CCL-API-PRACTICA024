// index.js
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { PORT, JWT_SECRET } from './config.js';
import { UserRepository } from './user-repository.js';
import { IVA } from './iva.js';
import { EstadoDeRenta } from './estado-de-renta.js';
import { LeyesSociales } from './leyes-sociales.js';
import { Sueldos } from './sueldos.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// Middleware para verificar el token en cada solicitud
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    if (token) {
        try {
            const data = jwt.verify(token, JWT_SECRET);  // Verificación del token JWT
            req.session.user = data; // Guardamos los datos del usuario en la sesión
        } catch (error) {
            console.error('Error al verificar el token:', error);
        }
    }
    next();
});

// Ruta principal para login o panel de administración
app.get('/', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.render('example', { username: undefined });  // Muestra el login
    }

    res.render('example', { username: user.username });  // Muestra el panel si está autenticado
});

// Ruta protegida para contenido con datos adicionales
app.get('/protected', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(403).send('Acceso denegado. No se proporcionó un token válido.');
    }

    // Renderiza la vista protegida y pasa los datos del usuario
    res.render('protected', { user });
});

// Ruta para manejar el login y generar el token JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserRepository.login({ username, password });
        const token = jwt.sign(
            { id: user._id, username: user.username },  // Datos que firmamos en el token
            JWT_SECRET,
            { expiresIn: '1h' }  // Token expira en 1 hora
        );

        // Configuramos la cookie con el token JWT
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000  // 1 hora
        }).send({ token });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const id = await UserRepository.create({ username, password });
        res.send({ id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    res.clearCookie('access_token').send({ message: 'Sesión cerrada' });
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// RUTAS DE CLASES

// Ruta para leyes sociales
app.get('/leyes-sociales.js', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(403).send('Acceso denegado. No se proporcionó un token válido.');
    }

    const leyesSociales = new LeyesSociales();
    leyesSociales.obtenerInformacion('http://localhost:3000/api/leyes-sociales')
        .then(info => {
            res.render('leyes-sociales', { info });
        })
        .catch(error => {
            console.error('Error al obtener leyes sociales:', error);
            res.render('leyes-sociales', { info: null, error: 'No hay leyes sociales disponibles.' });
        });
});

// Ruta para estado de renta
app.get('/estado-de-renta.js', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(403).send('Acceso denegado. No se proporcionó un token válido.');
    }

    const estadoDeRenta = new EstadoDeRenta();
    estadoDeRenta.obtenerDatosServidor()
        .then(() => {
            const info = estadoDeRenta.obtenerEstado();
            res.render('estado-de-renta', { info });
        })
        .catch(error => {
            console.error('Error al obtener estado de renta:', error);
            res.render('estado-de-renta', { info: null, error: 'No hay datos de estado de renta disponibles.' });
        });
});

// Ruta para sueldos
app.get('/sueldos.js', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(403).send('Acceso denegado. No se proporcionó un token válido.');
    }

    const sueldos = new Sueldos();
    try {
        // Aquí puedes agregar sueldos si es necesario
        // sueldos.agregarSueldo('Empleado 1', 3000); // Ejemplo de cómo agregar
        // sueldos.agregarSueldo('Empleado 2', 4000);
        // sueldos.agregarSueldo('Empleado 3', 5000);
        
        const info = sueldos.obtenerInformacion(); // Solo devuelve la lista de sueldos
        res.render('sueldos', { info, error: null }); // Pasa la información a la vista
    } catch (error) {
        console.error('Error al obtener sueldos:', error);
        res.render('sueldos', { info: null, error: 'No hay sueldos disponibles.' }); // Pasa el mensaje de error
    }
});

// Ruta para IVA
app.get('/iva.js', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(403).send('Acceso denegado. No se proporcionó un token válido.');
    }

    const iva = new IVA();
    iva.obtenerInformacion(1000).then(info => {
        console.log('Información de IVA obtenida:', info);
        res.render('iva', { info });
    }).catch(error => {
        console.error('Error al obtener información de IVA:', error);
        // Renderiza la vista con un mensaje de error
        res.render('iva', { info: null, error: 'No hay datos disponibles en el servidor.' });
    });
});
