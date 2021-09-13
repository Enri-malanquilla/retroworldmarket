// Módulo para Iniciar la Base de Datos

// Traer el módulo getDB.js
const getDB = require('./getDB.js');

// FALTA IMPORTAR LA DEPENDENCIA FAKER para simular los usuarios

// FALTAN MÁS PASOS, VAMOS POCO A POCO...

// Crear la función principal donde se crearán las tablas:
async function main() {
  // Establecer la conexión con la Base de Datos:
  let connection;
  try {
    connnection = await getDB();

    //Eliminamos tablas si existen

    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS messages');
    await connection.query('DROP TABLE IF EXISTS photos');

    await connection.query('DROP TABLE IF EXISTS historyProducts');

    console.log('tablas eliminadas');

    // Crear la tabla de USUARIOS con las respectivas columnas (location = localidad):
    await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                alias VARCHAR(50) UNIQUE NOT NULL,
                avatar VARCHAR(50),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(512) NOT NULL,
                location VARCHAR(50) NOT NULL,
                province VARCHAR(50) NOT NULL,
                postalCode INT(5) NOT NULL,
                rol ENUM('usuario','administrador') DEFAULT 'usuario' NOT NULL,
                active BOOLEAN DEFAULT false,
                deleted BOOLEAN DEFAULT false,
                verifiedCode VARCHAR(100),
                recoverCode VARCHAR(100),
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME
            )
    `);

    console.log('tabla usuarios creada');
    // Creamos la tabla de PRODUCTOS (brand = Marca; yearOfProduction = Año de Fabricación;
    // status = Estado de funcionamiento; MEDIUMINT = Nº entre 0 y 16.777.215)
    await connection.query(`
            CREATE TABLE products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                nameProduct VARCHAR(50) NOT NULL,
                brand VARCHAR(50) NOT NULL,
                yearOfProduction VARCHAR(4),
                status ENUM('No funciona', 'A veces falla', 'Bien', 'Muy bien', 'Excelente') NOT NULL,
                category ENUM('Todas las Categorías', 'Ordenadores', 'Televisores', 'Telefonía', 'Música y Rádio', 'Consolas y Juegos') NOT NULL,
                description VARCHAR(200) NOT NULL,
                price MEDIUMINT NOT NULL,
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME,
                deletedDate DATETIME,
                active BOOLEAN DEFAULT true,
                sold BOOLEAN DEFAULT false,
                reserved BOOLEAN DEFAULT false,
                reservedDate DATETIME,
                deleted BOOLEAN DEFAULT false,
                chatRoom VARCHAR(250)
            )
    `);

    console.log('tabla productos creada');

    // Creamos la tabla de Photos (idphoto, idProducts, idUsers, datePublications)
    await connection.query(`
            CREATE TABLE photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idProducts INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                namePhoto VARCHAR(50) NOT NULL,
                createdDate DATETIME NOT NULL
            )
    `);

    console.log('tabla fotos creada');

    //Creamos la tabla de mensajes entre usuarios

    await connection.query(`
              CREATE TABLE messages (
                idProducts  INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                idUser INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES users (id),
                text VARCHAR(255),
                idmessage PRIMARY KEY AUTO_INCREMENT,
                createdMsg DATETIME NOT NULL 
              )
    `);

    console.log('tabla mensajes creada');

    // Creamos la Tabla de Votos de los Vendedores (FALTARÍA EL ID DEL DUEÑO DEL PRODUCTO, es decir, a quién vota??):
    await connection.query(`
              CREATE TABLE votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsers INT NOT NULL,
                FOREIGN KEY (idUsers) REFERENCES users (id) ON DELETE CASCADE,
                vote ENUM('1','2', '3', '4', '5'),
                idproduct INT NOT NULL,
                FOREIGN KEY (idproduct) REFERENCES product (id) ON DELETE CASCADE
              )
    `);
    console.log('Tabla de Votos de Vendedores creada correctamente');
    // Creamos la tabla de HistorialProducts (idProducto, idUsers, datePublications, dateSoldProducts, dateDeletedProducts)
    await connection.query(`
            CREATE TABLE historialProductos (
                id INT PRIMARY KEY,
                idProducts INT NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES products (id),
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                dateSoldProduct DATETIME,
            )
    `);
    console.log('Tabla de Hostorial de productos Creada correctamente');
    // Capturamos TODOS los errores en el CATCH.
  } catch (error) {
    console.error(error.message);
  } finally {
    // Bloque FINALLY obligatorio. Tanto si todo va PERFECTO como si hay ERRORES se ejecutará
    // para terminar la conexión:
    if (connection) connection.release();
    process.exit(0);
  }
}
main();
