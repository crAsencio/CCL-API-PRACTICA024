
import crypto from 'node:crypto';
import DBLocal from 'db-local';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

// Inicializa la base de datos local
const db = new DBLocal({ path: './db' });
const { Schema } = db;

// Define el esquema de usuarios
const users = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Clase que maneja la lógica de usuarios
class UserRepository {
    // Método para crear un nuevo usuario
    static async create({ username, password }) {
        UserRepository.validateUsername(username);
        UserRepository.validatePassword(password);

        const existingUser = users.findOne({ username });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        users.create({ _id: id, username, password: hashedPassword }).save();
        return id;
    }

    // Método para iniciar sesión
    static async login({ username, password }) {
        UserRepository.validateUsername(username);
        UserRepository.validatePassword(password);

        const user = users.findOne({ username });
        if (!user) {
            throw new Error('El nombre de usuario no existe');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Contraseña inválida');
        }

        const { password: userPassword, ...publicUser } = user;
        return publicUser;
    }

    // Método para validar el nombre de usuario
    static validateUsername(username) {
        if (typeof username !== 'string') {
            throw new Error('El nombre de usuario debe ser una cadena');
        }
    }

    // Método para validar la contraseña
    static validatePassword(password) {
        if (typeof password !== 'string') {
            throw new Error('La contraseña debe ser una cadena');
        }
        if (password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }
    }
}

export { UserRepository };
