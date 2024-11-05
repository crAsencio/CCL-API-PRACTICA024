# Aplicación Web para Gestión Financiera y Recursos Humanos

Esta aplicación web, construida con **Node.js** y **Express**, está diseñada para gestionar información financiera y de recursos humanos. Ofrece funcionalidades de autenticación y permite a los usuarios acceder a datos sobre IVA, sueldos y estado de renta. La aplicación utiliza **EJS (Embedded JavaScript)** para renderizar vistas dinámicas en HTML, y emplea **JWT** para la autenticación segura de usuarios.

## Lenguajes y Tecnologías

- **JavaScript**: Lógica del servidor y manipulación de datos.
- **EJS (Embedded JavaScript)**: Renderizado de vistas dinámicas en HTML.
- **JSON**: Configuración del proyecto y gestión de dependencias.
- **YAML**: Gestión de dependencias mediante el archivo de bloqueo `pnpm-lock.yaml`.

## Descripción de Archivos

- **`index.js`**: Archivo principal de la aplicación. Configura el servidor Express, maneja rutas de autenticación de usuarios (login) y ofrece acceso a recursos de IVA, sueldos y estado de renta. Utiliza **JWT** para la autenticación.

- **`iva.js`**: Contiene la clase `IVA`, que calcula el IVA en función de una base dada. Además, hace solicitudes a una API externa para obtener datos relacionados con el IVA.

- **`user-repository.js`**: Define la clase `UserRepository`, que gestiona la lógica de usuarios, incluida la creación y autenticación de usuarios. Utiliza **bcrypt** para el hashing de contraseñas y almacena la información de los usuarios en una base de datos local.

- **`config.js`**: Contiene la configuración de la aplicación, como el puerto del servidor y la clave secreta para **JWT**. Los valores pueden sobrescribirse mediante variables de entorno.

- **`views/iva.ejs`**: Vista que muestra la información calculada del IVA, utilizando **EJS** para renderizar datos dinámicos como la base, la tasa y el IVA calculado.

- **`views/estado-de-renta.ejs`**: Vista similar a `iva.ejs`, pero muestra el estado de renta, incluyendo ingresos, gastos y beneficios.

- **`sueldos.js`**: Define la clase `Sueldos`, que permite almacenar y gestionar información sobre los sueldos de los empleados.

- **`package.json`**: Archivo de configuración del proyecto que define las dependencias necesarias, scripts de inicio y otros metadatos.

- **`pnpm-lock.yaml`**: Archivo de bloqueo que asegura la instalación de las mismas versiones de las dependencias en cada entorno.

## Funcionalidad General

La aplicación está diseñada para proporcionar un sistema de gestión de datos financieros y de recursos humanos de manera modular y escalable. Ofrece funcionalidades esenciales para el cálculo de IVA, el manejo de información salarial y el estado de renta de los usuarios, asegurando autenticación y seguridad en el acceso a los datos mediante **JWT**.

